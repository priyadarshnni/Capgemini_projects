import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Login</h2>

    <input [(ngModel)]="username" placeholder="Username">
    <br><br>

    <input [(ngModel)]="password" type="password" placeholder="Password">
    <br><br>

    <button (click)="login()">Login</button>
  `
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/']);
    } else {
      alert('Invalid credentials');
    }
  }
}