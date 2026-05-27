import { FormEvent, useEffect, useMemo, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { DashboardData, getJson, postJson, Session } from './lib/api';
import { checkSymptoms } from './lib/symptomChecker';
import { LoginPanel } from './components/LoginPanel';
import { MetricCard } from './components/MetricCard';

type Appointment = {
  id: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  startsAt: string;
  isVideoConsultation: boolean;
  status: string;
  reason: string;
};

type EmergencyCase = {
  id: string;
  patientName: string;
  severity: string;
  location: string;
  status: string;
  reportedAt: string;
};

const initialDashboard: DashboardData = {
  registeredPatients: 0,
  doctors: 0,
  appointmentsToday: 0,
  emergencyOpenCases: 0,
  pendingInvoices: 0,
  videoConsultations: 0,
  branchLoad: []
};

export function App() {
  const [session, setSession] = useState<Session | null>(() => {
    const stored = localStorage.getItem('hospital.session');
    return stored ? JSON.parse(stored) : null;
  });
  const [dashboard, setDashboard] = useState<DashboardData>(initialDashboard);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyCase[]>([]);
  const [notification, setNotification] = useState('No realtime notifications yet.');
  const [symptoms, setSymptoms] = useState('fever and cough');
  const [triage, setTriage] = useState(checkSymptoms(symptoms));
  const [bookingMessage, setBookingMessage] = useState('');

  const canSeeAdmin = session?.role === 'SuperAdmin' || session?.role === 'BranchAdmin';

  useEffect(() => {
    if (!session) {
      return;
    }

    localStorage.setItem('hospital.session', JSON.stringify(session));
    getJson<Appointment[]>('/api/appointments', session.accessToken).then(setAppointments);
    getJson<EmergencyCase[]>('/api/emergency/cases', session.accessToken).then(setEmergencies);

    if (canSeeAdmin) {
      getJson<DashboardData>('/api/admin/analytics', session.accessToken).then(setDashboard);
    }
  }, [session, canSeeAdmin]);

  useEffect(() => {
    if (!session) {
      return;
    }

    const connection = new HubConnectionBuilder()
      .withUrl('/hubs/hospital', { accessTokenFactory: () => session.accessToken })
      .configureLogging(LogLevel.Warning)
      .withAutomaticReconnect()
      .build();

    connection.on('appointment.created', appointment => {
      setAppointments(current => [appointment, ...current]);
      setNotification(`Appointment created for ${new Date(appointment.startsAt).toLocaleString()}`);
    });

    connection.on('emergency.reported', emergency => {
      setEmergencies(current => [emergency, ...current]);
      setNotification(`Emergency reported: ${emergency.severity} at ${emergency.location}`);
    });

    connection.start().then(() => {
      connection.invoke('JoinBranch', session.branchId ?? '11111111-1111-1111-1111-111111111111');
    });

    return () => {
      connection.stop();
    };
  }, [session]);

  const currentBranchLoad = useMemo(() => dashboard.branchLoad.at(0), [dashboard]);

  if (!session) {
    return <LoginPanel onLogin={setSession} />;
  }

  function logout() {
    localStorage.removeItem('hospital.session');
    setSession(null);
  }

  async function createDemoBooking(event: FormEvent) {
    event.preventDefault();
    setBookingMessage('');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    try {
      const created = await postJson<Appointment>('/api/appointments', session.accessToken, {
        patientId: 'cccccccc-cccc-cccc-cccc-cccccccccccc',
        doctorId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        branchId: '11111111-1111-1111-1111-111111111111',
        startsAt: tomorrow.toISOString(),
        durationMinutes: 30,
        isVideoConsultation: true,
        reason: 'Online follow-up consultation'
      });
      setAppointments(current => [created, ...current]);
      setBookingMessage('Appointment booked.');
    } catch (error) {
      setBookingMessage(error instanceof Error ? error.message : 'Booking failed');
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Central Hospital Platform</p>
          <h1>{session.role} Dashboard</h1>
        </div>
        <div className="user-chip">
          <span>{session.fullName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="alert-band">
        <strong>Realtime:</strong> {notification}
      </section>

      {canSeeAdmin && (
        <section className="metrics-grid">
          <MetricCard label="Patients" value={dashboard.registeredPatients} />
          <MetricCard label="Doctors" value={dashboard.doctors} />
          <MetricCard label="Appointments today" value={dashboard.appointmentsToday} />
          <MetricCard label="Video consults" value={dashboard.videoConsultations} />
          <MetricCard label="Pending invoices" value={dashboard.pendingInvoices} />
          <MetricCard label="Open emergencies" value={dashboard.emergencyOpenCases} tone="danger" />
        </section>
      )}

      <section className="layout-grid">
        <article className="panel">
          <div className="panel-heading">
            <h2>Appointment Scheduler</h2>
            <form onSubmit={createDemoBooking}>
              <button type="submit">Book demo video consult</button>
            </form>
          </div>
          {bookingMessage && <p className="notice">{bookingMessage}</p>}
          <div className="table-list">
            {appointments.map(appointment => (
              <div key={appointment.id} className="list-row">
                <div>
                  <strong>{new Date(appointment.startsAt).toLocaleString()}</strong>
                  <span>{appointment.reason}</span>
                </div>
                <span className="pill">{appointment.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>AI Symptom Checker</h2>
          <textarea value={symptoms} onChange={event => setSymptoms(event.target.value)} />
          <button onClick={() => setTriage(checkSymptoms(symptoms))}>Check symptoms</button>
          <p className="triage">{triage}</p>
        </article>

        <article className="panel">
          <h2>Emergency Tracking</h2>
          <div className="table-list">
            {emergencies.map(item => (
              <div key={item.id} className="list-row">
                <div>
                  <strong>{item.patientName}</strong>
                  <span>{item.location}</span>
                </div>
                <span className={`pill severity-${item.severity.toLowerCase()}`}>{item.severity}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h2>Branch Operations</h2>
          {currentBranchLoad ? (
            <div className="branch-load">
              <strong>{currentBranchLoad.name}</strong>
              <span>{currentBranchLoad.upcomingAppointments} upcoming appointments</span>
              <span>{currentBranchLoad.activeEmergencies} active emergencies</span>
            </div>
          ) : (
            <p className="muted">Branch analytics are available to branch admins and super admins.</p>
          )}
        </article>
      </section>
    </main>
  );
}
