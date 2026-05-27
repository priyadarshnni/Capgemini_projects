# Architecture

The platform is split into a React frontend and an ASP.NET Core Web API. The API currently uses an in-memory repository so the assessment can run without external dependencies, while `infra/sql/schema.sql` defines the SQL Server persistence model.

## Runtime Modules

- Patient Portal: registration, appointments, prescriptions, lab reports, billing visibility.
- Doctor Dashboard: appointment queue, video consult indicator, prescriptions, reports.
- Appointment Scheduler: conflict detection around doctor and time-slot overlap.
- Lab & Prescription Management: clinical report and prescription endpoints.
- Billing & Insurance: invoice endpoints and payment gateway session placeholder.
- Telemedicine: video consult flag plus room-ready appointment model.
- Admin Analytics Dashboard: operational branch metrics, emergency counts, billing status.

## Security

- JWT bearer-style authentication is implemented locally for the demo.
- Role checks are applied on administrative, billing, and registration actions.
- Audit logging records security-sensitive actions.
- Production should move signing keys to Azure Key Vault, use HTTPS only, encrypt PHI at rest, and add SQL row-level branch isolation where appropriate.

## Scale and Reliability

- SignalR provides realtime appointment and emergency notifications.
- Appointment creation uses a lock in the local repository; SQL Server should enforce the same rule using transactions and an overlap check.
- Billing and pharmacy are good candidates for separate services because they have different data ownership, scaling patterns, and compliance workflows.
- Azure deployment should use App Service or AKS, Azure SQL, Azure SignalR Service, Key Vault, Application Insights, and Front Door or Application Gateway.
