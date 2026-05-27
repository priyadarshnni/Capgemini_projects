using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Labs;

public static class LabEndpoints
{
    public static RouteGroupBuilder MapLabEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/clinical");

        group.MapGet("/prescriptions", (Guid? patientId, IHospitalRepository repository) =>
            Results.Ok(repository.Prescriptions.Where(p => patientId is null || p.PatientId == patientId)));

        group.MapGet("/lab-reports", (Guid? patientId, IHospitalRepository repository) =>
            Results.Ok(repository.LabReports.Where(r => patientId is null || r.PatientId == patientId)));

        return api;
    }
}
