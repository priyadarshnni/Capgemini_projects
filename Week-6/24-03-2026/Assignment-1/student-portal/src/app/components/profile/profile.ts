import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="card">
      <h2>Student Info</h2>
      <p>Name: Student</p>
      <p>Course: Angular</p>
    </div>

    <div class="card">
      <h3>Shared Data Concept</h3>
      <p>All components use the same service instance.</p>
    </div>
  `
})
export class ProfileComponent {}