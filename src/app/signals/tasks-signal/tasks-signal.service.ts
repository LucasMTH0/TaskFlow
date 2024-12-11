import { Injectable, signal } from '@angular/core';
import { Task } from '../../types/Task';

@Injectable({
  providedIn: 'root'
})
export class TasksSignalService {
  private tasksPending = signal<Task[]>([])
  private tasksFinished = signal<Task[]>([])
  constructor() { }

  getTasksPending(){
    const tasks = this.tasksPending.asReadonly()
    return tasks()
  }

  getTasksFinished(){
    const tasks = this.tasksFinished.asReadonly()
    return tasks()
  }

  setTasksPending(tasks: Task[]){
    this.tasksPending.set(tasks)
  }
  setTasksFinished(tasks: Task[]){
    this.tasksFinished.set(tasks)
  }

  updateTasksPending(task: Task){
    this.tasksPending.update(tasks => [...tasks, task])
  }
  updateTasksFinished(task: Task){
    this.tasksFinished.update(tasks => [...tasks, task])
  }
}
