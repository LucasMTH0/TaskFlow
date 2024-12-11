import { Component, effect, inject, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { AsyncPipe } from '@angular/common';
import { TasksColumnComponent } from '../../components/tasks-column/tasks-column.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {CreateTaskComponent} from '../task/create-task/create-task.component';
import {CardTaskComponent} from '../../components/card-task/card-task.component';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DragTasksServiceService} from '../../services/drag-tasks-service/drag-tasks-service.service';
import { UserSignalService } from '../../signals/user/user-signal.service';
import { Task } from '../../types/Task';
import { Router } from '@angular/router';
import { EditTaskComponent } from '../task/edit-task/edit-task.component';
import { TasksSignalService } from '../../signals/tasks-signal/tasks-signal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, TasksColumnComponent, MatIcon, MatIconButton, CardTaskComponent, CardTaskComponent, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  protected router = inject(Router);
  readonly dialog = inject(MatDialog);
  private taskService = inject(TaskService);
  protected userSignal = inject(UserSignalService);
  private dragTasksService = inject(DragTasksServiceService);
  public tasksSignal = inject(TasksSignalService)

  protected isUserLogged: any = null;
  protected tasksPending: any = []
  protected tasksComplete: any = []

  constructor(){
    effect(() =>{ 
      this.isUserLogged = this.userSignal.getLocalUser()
      if(this.isUserLogged){
        this.filterTasks()
      }
    })
  }

  ngOnInit(): void {
    // this.filterTasks()
  }



  resetTasksList(){
    this.tasksPending = []
    this.tasksComplete = []
  }

  separateTasks(tasks: Task[]){
    tasks.map((task: any) => {
      if(task.done === true || task.done === 1){
        this.tasksComplete.push(task)
        this.tasksSignal.updateTasksFinished(task)
      } else {
        this.tasksSignal.updateTasksPending(task)
        this.tasksPending.push(task)
      }
    })
    console.log("complete: ", this.tasksComplete)
    console.log("pending: ", this.tasksPending)
  }

  filterTasks(){
      this.resetTasksList()
      console.log("ta logado: ", this.isUserLogged)
      this.taskService.getTasks(this.isUserLogged?.id).subscribe((tasks: any) => this.separateTasks(tasks))
  }
  


  openRegisterTask(){
    const dialogRef = this.dialog.open(CreateTaskComponent,{ height:'400px', width:'600px'});
    dialogRef.afterClosed().subscribe(result => this.filterTasks());
  }

  dropTaskCard(event: CdkDragDrop<string[]>) {
    console.log("aconteceu alguma coisa: ", event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openEditTask(task: any){
    const dialogRef = this.dialog.open(EditTaskComponent,{ data: task, height:'470px',width:'600px'});

    dialogRef.afterClosed().subscribe(result => {
      // this.tasks$ = this.taskService.getTasks()
    });
  }
}
