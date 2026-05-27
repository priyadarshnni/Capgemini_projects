using Hospital.Api.Domain;

namespace Hospital.Api.Infrastructure;

public interface IHospitalRepository
{
    IReadOnlyList<HospitalBranch> Branches { get; }
    IReadOnlyList<Doctor> Doctors { get; }
    IReadOnlyList<Patient> Patients { get; }
    IReadOnlyList<Prescription> Prescriptions { get; }
    IReadOnlyList<LabReport> LabReports { get; }
    IReadOnlyList<Invoice> Invoices { get; }
    IReadOnlyList<EmergencyCase> EmergencyCases { get; }
    IReadOnlyList<UserAccount> Users { get; }

    UserAccount? FindUserByEmail(string email);
    Patient AddPatient(Patient patient);
    Appointment? AddAppointment(Appointment appointment);
    Invoice AddInvoice(Invoice invoice);
    EmergencyCase AddEmergencyCase(EmergencyCase emergencyCase);
    IReadOnlyList<Appointment> GetAppointments(Guid? branchId = null, Guid? doctorId = null, Guid? patientId = null);
    bool TryUpdateAppointmentStatus(Guid appointmentId, AppointmentStatus status, out Appointment? updated);
}
