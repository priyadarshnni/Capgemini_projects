import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.html'
})
export class TaskForm {

  title: string = '';

  @Output() taskAdded = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  addTask() {
    console.log("Add clicked:", this.title); // 🔍 debug

    if (!this.title.trim()) return;

    this.taskService.addTask({
      title: this.title,
      completed: false
    }).subscribe({
      next: (res) => {
        console.log("Added:", res); // 🔍 debug
        this.title = '';
        this.taskAdded.emit();
      },
      error: (err) => console.error("Add error:", err)
    });
  }
}