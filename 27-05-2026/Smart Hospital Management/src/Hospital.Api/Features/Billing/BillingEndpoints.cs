using System.Security.Claims;
using Hospital.Api.Domain;
using Hospital.Api.Infrastructure;

namespace Hospital.Api.Features.Billing;

public static class BillingEndpoints
{
    public static RouteGroupBuilder MapBillingEndpoints(this RouteGroupBuilder api)
    {
        var group = api.MapGroup("/billing");

        group.MapGet("/invoices", (Guid? patientId, IHospitalRepository repository) =>
            Results.Ok(repository.Invoices.Where(invoice => patientId is null || invoice.PatientId == patientId)));

        group.MapPost("/invoices", (CreateInvoiceRequest request, IHospitalRepository repository, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            if (!user.IsInRole(nameof(Role.BillingOfficer)) && !user.IsInRole(nameof(Role.BranchAdmin)) && !user.IsInRole(nameof(Role.SuperAdmin)))
            {
                return Results.Forbid();
            }

            var invoice = repository.AddInvoice(new Invoice(Guid.NewGuid(), request.PatientId, request.Amount, request.Currency, "Pending", "NotSubmitted", DateTimeOffset.UtcNow));
            auditLog.Record(user.Identity?.Name ?? "unknown", "invoice.created", nameof(Invoice), invoice.Id.ToString());
            return Results.Created($"/api/billing/invoices/{invoice.Id}", invoice);
        });

        group.MapPost("/payments/create-session", (CreatePaymentSessionRequest request, IAuditLog auditLog, ClaimsPrincipal user) =>
        {
            auditLog.Record(user.Identity?.Name ?? "unknown", "payment.session.created", "PaymentGateway", request.InvoiceId.ToString());
            return Results.Ok(new
            {
                request.InvoiceId,
                provider = "Payment gateway placeholder",
                checkoutUrl = $"https://payments.example.local/checkout/{request.InvoiceId}",
                expiresAt = DateTimeOffset.UtcNow.AddMinutes(20)
            });
        });

        return api;
    }
}

public sealed record CreateInvoiceRequest(Guid PatientId, decimal Amount, string Currency);

public sealed record CreatePaymentSessionRequest(Guid InvoiceId);
