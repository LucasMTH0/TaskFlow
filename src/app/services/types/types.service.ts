import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  private http = inject(HttpClient)

  getTaskTypes(){
    return this.http.get(environment.TASK_API_URL+"/types");
  }
}
