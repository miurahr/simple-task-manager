import { Component, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from './task.material';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements AfterViewInit {
  @Input() projectId: string;
  @Input() tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngAfterViewInit(): void {
    this.taskService.selectedTaskChanged.subscribe((task) => {
      for (const i in this.tasks) {
        if (this.tasks[i].id === task.id) {
          this.tasks[i] = task;
          break;
        }
      }
    });
  }

  public get selectedTaskId(): string {
    return this.taskService.getSelectedTask().id;
  }

  public onListItemClicked(id: string) {
    this.taskService.selectTask(this.tasks.find(t => t.id === id));
  }
}
