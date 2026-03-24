import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses = [
    { id: 1, name: 'Angular', description: 'Frontend framework' },
    { id: 2, name: 'React', description: 'UI library' },
    { id: 3, name: 'Node', description: 'Backend runtime' }
  ];

  getCourses() {
    return of(this.courses);
  }

  getCourseById(id: number) {
    return of(this.courses.find(c => c.id === id));
  }
}