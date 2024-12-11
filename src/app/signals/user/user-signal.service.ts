import { EventEmitter, Injectable, signal } from '@angular/core';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserSignalService {
  private localStoreUser = signal<User | null>(null)
  constructor() { }

  getLocalUser(){
    const user = this.localStoreUser.asReadonly()

    return user()
  }


  setLocalUser(user: User){
    this.localStoreUser.set(user)
  }

  clearLocalUser(){
    this.localStoreUser.set(null)
  }

}
