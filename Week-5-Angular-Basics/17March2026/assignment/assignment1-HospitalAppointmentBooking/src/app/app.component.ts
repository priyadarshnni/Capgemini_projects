import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  patientName = '';
  selectedDoctor = '';
  appointmentDate = '';
  consultationType: 'Online' | 'Offline' = 'Online';
  symptoms = '';

  confirmationMessage = '';

  readonly doctors = [
    'Dr. Sharma (Cardiologist)',
    'Dr. Verma (Dermatologist)',
    'Dr. Iyer (General Physician)',
    'Dr. Khan (Orthopedic)'
  ];

  readonly minDate = new Date().toISOString().split('T')[0];

  get consultationFee(): number {
    return this.consultationType === 'Online' ? 300 : 500;
  }

  submitAppointment(): void {
    this.confirmationMessage = `Appointment confirmed for ${this.patientName} with ${this.selectedDoctor} on ${this.appointmentDate} (${this.consultationType}).`;
  }
}
