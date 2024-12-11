import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  constructor() { }

  getTasks(userId: number){
    return this.http.get(`${environment.TASK_API_URL}/tasks/${userId}`)
  }

  createTask(formTask: any){
    return this.http.post(environment.TASK_API_URL+"/task", formTask);
  }

  editTask(id: number, formTask: any) {
    return this.http.put(environment.TASK_API_URL+"/task/"+id , formTask);
  }

  deleteTask(id: number){
    return this.http.delete(environment.TASK_API_URL+"/task/"+id)
  }
}
