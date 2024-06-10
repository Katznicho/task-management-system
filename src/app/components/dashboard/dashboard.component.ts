import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: any[] = [];
  editTask: any = null;
  createTask: any = null;
  newAssignee: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  startEdit(task: any) {
    this.editTask = { ...task };
  }

  saveEdit() {
    if (this.editTask) {
      this.taskService.updateTask(this.editTask).subscribe(updatedTask => {
        this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        this.editTask = null;
      });
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }

  assignTask(taskId: number, assignee: string) {
    this.taskService.assignTask(taskId, assignee).subscribe(updatedTask => {
      this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    });
  }

  startCreate() {
    this.createTask = {
      taskName: '',
      description: '',
      assignee: '',
      status: 'pending'
    };
  }

  saveCreate() {
    if (this.createTask) {
      this.taskService.createTask(this.createTask).subscribe(newTask => {
        this.tasks.push(newTask);
        this.createTask = null;
      });
    }
  }
}
