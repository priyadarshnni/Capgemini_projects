using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;
using Hospital.Api.Realtime;
using Microsoft.AspNetCore.SignalR;

namespace Hospital.Api.Features.Appointments;

public static class AppointmentEndpoints
{
    public static RouteGroupBuilder MapAppointmentEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/appointments");

        group.MapGet("/", (Guid? branchId, Guid? doctorId, Guid? patientId, IHospitalRepository repository) =>
            Results.Ok(repository.GetAppointments(branchId, doctorId, patientId)));

        group.MapPost("/", async (CreateAppointmentRequest request, IHospitalRepository repository, IAuditLog auditLog, IHubContext<HospitalHub> hub, ClaimsPrincipal user) =>
        {
            var startsAt = request.StartsAt.ToUniversalTime();
            var appointment = new Appointment(
                Guid.NewGuid(),
                request.PatientId,
                request.DoctorId,
                request.BranchId,
                startsAt,
                startsAt.AddMinutes(request.DurationMinutes),
                request.IsVideoConsultation,
                AppointmentStatus.Confirmed,
                request.Reason);

            var created = repository.AddAppointment(appointment);
            if (created is null)
            {
                auditLog.Record(user.Identity?.Name ?? "unknown", "appointment.conflict", nameof(Appointment), request.DoctorId.ToString());
                return Results.Conflict(new { message = "The selected doctor already has an appointment in this time window." });
            }

            auditLog.Record(user.Identity?.Name ?? "unknown", "appointment.created", nameof(Appointment), created.Id.ToString());
            await hub.Clients.Group($"branch:{created.BranchId}").SendAsync("appointment.created", created);
            await hub.Clients.Group($"patient:{created.PatientId}").SendAsync("appointment.created", created);
            return Results.Created($"/api/appointments/{created.Id}", created);
        });

        group.MapPatch("/{appointmentId:guid}/status", async (Guid appointmentId, UpdateAppointmentStatusRequest request, IHospitalRepository repository, IAuditLog auditLog, IHubContext<HospitalHub> hub, ClaimsPrincipal user) =>
        {
            if (!repository.TryUpdateAppointmentStatus(appointmentId, request.Status, out var updated) || updated is null)
            {
                return Results.NotFound();
            }

            auditLog.Record(user.Identity?.Name ?? "unknown", "appointment.status.updated", nameof(Appointment), updated.Id.ToString());
            await hub.Clients.Group($"branch:{updated.BranchId}").SendAsync("appointment.updated", updated);
            await hub.Clients.Group($"patient:{updated.PatientId}").SendAsync("appointment.updated", updated);
            return Results.Ok(updated);
        });

        return api;
    }
}

public sealed record CreateAppointmentRequest(
    Guid PatientId,
    Guid DoctorId,
    Guid BranchId,
    DateTimeOffset StartsAt,
    int DurationMinutes,
    bool IsVideoConsultation,
    string Reason);

public sealed record UpdateAppointmentStatusRequest(AppointmentStatus Status);
