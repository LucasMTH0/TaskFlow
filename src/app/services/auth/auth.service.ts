import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { UserSignalService } from '../../signals/user/user-signal.service';
import { LocalStoreService } from '../localStore/local-store.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageService = inject(LocalStoreService);
  private UserSignal = inject(UserSignalService)
  private router = inject(Router);
  constructor(private http: HttpClient) { }


  login(formLogin: any){
    return this.http.get(`${environment.TASK_API_URL}/user/${formLogin.email}/${formLogin.password}`)
  }

  logout(){
    this.UserSignal.clearLocalUser()
    this.localStorageService.clearUserLocalStorage()
    this.router.navigateByUrl('/auth/login')
  }

  register(formRegister: any){
    return this.http.post(environment.TASK_API_URL+'/user', formRegister)
  }

}
