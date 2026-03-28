import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';import { EmployeeListComponent } from './employees/employee-list/employee-list';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];