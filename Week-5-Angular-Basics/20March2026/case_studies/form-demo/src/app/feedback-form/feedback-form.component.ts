import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css',
})
export class FeedbackForm {
  departments = ['Sales', 'Support', 'Marketing', 'HR'];
  allSkills = ['Angular', 'React', 'Node', 'Python'];
  feedback = {
    name: '',
    email: '',
    department: '',
    ratings: '',
    comments: '',
    skills: [] as string[],
  };


  submitForm(form : NgForm) {
    if (form.valid) {
      console.log('Feedback submitted:', this.feedback);
      alert(JSON.stringify(this.feedback, null, 2));
      form.resetForm();
      this.feedback.skills=[]; // Reset skills array after form reset

    }else{
      alert('Please fill out all required fields correctly.');
    }
  }

  updateSkills(skill: string, isChecked: boolean) {
    if (isChecked) {
      this.feedback.skills.push(skill);
    } else {
      const index = this.feedback.skills.indexOf(skill);
      if (index >= 0) {
        this.feedback.skills.splice(index, 1);
      }
    
    }
  }
}