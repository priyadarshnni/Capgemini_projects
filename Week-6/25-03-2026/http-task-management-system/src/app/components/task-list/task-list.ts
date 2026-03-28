import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task.service';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskForm],
  templateUrl: './task-list.html'
})
export class TaskList implements OnInit {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        console.log("Fetched:", data); // 🔍 debug
        this.tasks = data;
      },
      error: (err) => console.error("Fetch error:", err)
    });
  }

  refresh() {
    this.loadTasks();
  }

  toggle(task: Task) {
    this.taskService.updateTask(task.id!, {
      completed: !task.completed
    }).subscribe(() => this.loadTasks());
  }

  delete(id: number) {
    console.log("Deleting:", id); // 🔍 debug

    this.taskService.deleteTask(id)
      .subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error("Delete error:", err)
      });
  }
}