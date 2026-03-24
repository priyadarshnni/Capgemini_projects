import { Routes } from '@angular/router';


import { DashboardComponent } from './components/dashboard/dashboard';
import { CoursesComponent } from './components/courses/courses';
import { CourseDetailComponent } from './components/course-detail/course-detail';
import { ProfileComponent } from './components/profile/profile';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];