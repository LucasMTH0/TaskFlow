import {Component, inject, Input, OnInit} from '@angular/core';
import { CardTaskComponent } from '../card-task/card-task.component';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import {DragTasksServiceService} from '../../services/drag-tasks-service/drag-tasks-service.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../../pages/task/edit-task/edit-task.component';

@Component({
  selector: 'app-tasks-column',
  standalone: true,
  imports: [CardTaskComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './tasks-column.component.html',
  styleUrl: './tasks-column.component.scss'
})
export class TasksColumnComponent{
  protected dragTasksService = inject(DragTasksServiceService)
  @Input() tasks: any = [];
  @Input() title: string = "";
  @Input() idColumn: string = "";
  readonly dialog = inject(MatDialog);

  dropTaskCard(event: CdkDragDrop<string[]>) {
    console.log("aconteceu alguma coisa: ", event)
    this.dragTasksService.dropTaskToColumn(event)
  }

  openEditTask(task: any){
    const dialogRef = this.dialog.open(EditTaskComponent,{ data: task, height:'470px',width:'600px'});

    dialogRef.afterClosed().subscribe(result => {
      // this.tasks$ = this.taskService.getTasks()
    });
  }
}
