import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Course List</h2>

    <div *ngFor="let course of courses" class="card">
      <h3>{{ course.name }}</h3>
      <p>{{ course.description }}</p>
      <button (click)="viewCourse(course.id)">View Details</button>
    </div>

    
  `
})
export class CoursesComponent implements OnInit {

  courses: any[] = [];

  constructor(private service: CourseService, private router: Router) {}

  ngOnInit() {
    this.service.getCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }

  viewCourse(id: number) {
    this.router.navigate(['/course', id]);
  }
}