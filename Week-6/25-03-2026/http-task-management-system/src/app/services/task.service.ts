import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id?: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  updateTask(id: number, data: Partial<Task>) {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}