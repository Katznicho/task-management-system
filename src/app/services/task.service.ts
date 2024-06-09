// task.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor() { }

  getAllTasks(): Observable<any> {
    return from(axios.get(this.baseUrl)).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return throwError('Something went wrong while fetching tasks. Please try again later.');
      })
    );
  }

  createTask(task: any): Observable<any> {
    return from(axios.post(this.baseUrl, task)).pipe(
      catchError(error => {
        console.error('Error creating task:', error);
        return throwError('Something went wrong while creating the task. Please try again later.');
      })
    );
  }

  updateTask(task: any): Observable<any> {
    const { id, ...taskData } = task;
    return from(axios.put(`${this.baseUrl}/${id}`, taskData)).pipe(
      catchError(error => {
        console.error('Error updating task:', error);
        return throwError('Something went wrong while updating the task. Please try again later.');
      })
    );
  }

  deleteTask(id: number): Observable<any> {
    return from(axios.delete(`${this.baseUrl}/${id}`)).pipe(
      catchError(error => {
        console.error('Error deleting task:', error);
        return throwError('Something went wrong while deleting the task. Please try again later.');
      })
    );
  }
}
