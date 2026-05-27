using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;
using Hospital.Api.Realtime;
using Microsoft.AspNetCore.SignalR;

namespace Hospital.Api.Features.Emergency;

public static class EmergencyEndpoints
{
    public static RouteGroupBuilder MapEmergencyEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/emergency");

        group.MapGet("/cases", (Guid? branchId, IHospitalRepository repository) =>
            Results.Ok(repository.EmergencyCases.Where(e => branchId is null || e.BranchId == branchId)));

        group.MapPost("/cases", async (CreateEmergencyCaseRequest request, IHospitalRepository repository, IAuditLog auditLog, IHubContext<HospitalHub> hub, ClaimsPrincipal user) =>
        {
            var emergency = repository.AddEmergencyCase(new EmergencyCase(Guid.NewGuid(), request.BranchId, request.PatientName, request.Severity, request.Location, "Triage", DateTimeOffset.UtcNow));
            auditLog.Record(user.Identity?.Name ?? "unknown", "emergency.reported", nameof(EmergencyCase), emergency.Id.ToString());
            await hub.Clients.Group($"branch:{emergency.BranchId}").SendAsync("emergency.reported", emergency);
            return Results.Created($"/api/emergency/cases/{emergency.Id}", emergency);
        });

        return api;
    }
}

public sealed record CreateEmergencyCaseRequest(Guid BranchId, string PatientName, EmergencySeverity Severity, string Location);
