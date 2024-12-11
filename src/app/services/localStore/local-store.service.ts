import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  constructor() { }

  getUserToLocalStorage(){
    const user: string | null = localStorage.getItem(environment.TASKFLOR_LOCALSTORAGE_NAME)
    return user ? JSON.parse(user) : null 
  }

  clearUserLocalStorage(){
    localStorage.removeItem(environment.TASKFLOR_LOCALSTORAGE_NAME)
  }

  saveUserToLocalStorage(user: User){
    localStorage.setItem(environment.TASKFLOR_LOCALSTORAGE_NAME, JSON.stringify(user,null, 2))
  }
  
}
