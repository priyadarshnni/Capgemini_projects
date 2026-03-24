import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="course" class="card">
      <h2>{{ course.name }}</h2>
      <p>{{ course.description }}</p>
    </div>

    <div class="card">
      <h3>Reusability</h3>
      <p>This data is fetched from the same CourseService used in Courses page.</p>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {

  course: any;

  constructor(private route: ActivatedRoute, private service: CourseService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getCourseById(id).subscribe((data: any) => {
      this.course = data;
    });
  }
}