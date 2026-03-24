import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      <a routerLink="/dashboard">Dashboard</a>
      <a routerLink="/courses">Courses</a>
      <a routerLink="/profile">Profile</a>
    </nav>
  `
})
export class NavbarComponent {}