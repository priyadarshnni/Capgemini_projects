import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// Student Interface
interface Student {
  id: number;
  name: string;
  marks: number;
  isPass: boolean;
  grade: string;
  isTopper: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Student Dashboard';

  // Students Array
  students: Student[] = [
    { id: 1, name: 'Amit Kumar', marks: 95, isPass: true, grade: 'A', isTopper: true },
    { id: 2, name: 'Priya Sharma', marks: 88, isPass: true, grade: 'B', isTopper: false },
    { id: 3, name: 'Rahul Verma', marks: 92, isPass: true, grade: 'A', isTopper: true },
    { id: 4, name: 'Sneha Patel', marks: 35, isPass: false, grade: 'F', isTopper: false },
    { id: 5, name: 'Vikram Singh', marks: 78, isPass: true, grade: 'B', isTopper: false },
    { id: 6, name: 'Anjali Gupta', marks: 65, isPass: true, grade: 'C', isTopper: false },
    { id: 7, name: 'Karan Mehta', marks: 45, isPass: false, grade: 'F', isTopper: false },
    { id: 8, name: 'Neha Reddy', marks: 72, isPass: true, grade: 'B', isTopper: false },
    { id: 9, name: 'Sanjay Kumar', marks: 58, isPass: true, grade: 'D', isTopper: false },
    { id: 10, name: 'Deepika Rao', marks: 97, isPass: true, grade: 'A', isTopper: true }
  ];

  // Method to get grade description
  getGradeDescription(grade: string): string {
    switch(grade) {
      case 'A': return 'Excellent';
      case 'B': return 'Good';
      case 'C': return 'Average';
      case 'D': return 'Below Average';
      case 'F': return 'Failed';
      default: return 'Unknown';
    }
  }

  // Get total students
  getTotalStudents(): number {
    return this.students.length;
  }

  // Get passed students count
  getPassedStudents(): number {
    return this.students.filter(s => s.isPass).length;
  }

  // Get failed students count
  getFailedStudents(): number {
    return this.students.filter(s => !s.isPass).length;
  }

  // Get toppers count
  getToppersCount(): number {
    return this.students.filter(s => s.isTopper).length;
  }
}
