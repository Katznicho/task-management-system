// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = [
    { id: 1, assignee: 'Doe', status: 'pending', taskName: 'Sample Task', description: 'This is a sample task' },
    { id: 2, assignee: 'Jonny', status: 'pending', taskName: 'Test Task', description: 'This is a Test task' },
    { id: 3, assignee: 'Eve', status: 'completed', taskName: 'Test Task', description: 'This is a Test task' },
    { id: 4, assignee: 'Doe', status: 'in_progress', taskName: 'Test Task', description: 'This is a Test task' },
    { id: 5, assignee: 'Eve', status: 'completed', taskName: 'Test Task', description: 'This is a Test task' },
    { id: 6, assignee: 'Eve', status: 'completed', taskName: 'Test Task', description: 'This is a Test task' }
  ];

  private tasksSubject = new BehaviorSubject<any[]>(this.tasks);

  getAllTasks(): Observable<any[]> {
    return this.tasksSubject.asObservable();
  }

  updateTask(updatedTask: any): Observable<any> {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex > -1) {
      this.tasks[taskIndex] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
    return of(updatedTask);
  }

  deleteTask(taskId: number): Observable<any> {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
    return of({ id: taskId });
  }

  assignTask(taskId: number, assignee: string): Observable<any> {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      this.tasks[taskIndex].assignee = assignee;
      this.tasksSubject.next(this.tasks);
    }
    return of(this.tasks[taskIndex]);
  }

  createTask(newTask: any): Observable<any> {
    newTask.id = this.tasks.length + 1;
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
    return of(newTask);
  }
}
