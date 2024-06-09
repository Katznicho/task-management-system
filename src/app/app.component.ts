import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from "./component/task-form/task-form.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TaskFormComponent]
})
export class AppComponent {

  title = 'task-management-system';
}
