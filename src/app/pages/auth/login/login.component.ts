import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../types/User';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserSignalService } from '../../../signals/user/user-signal.service';
import { LocalStoreService } from '../../../services/localStore/local-store.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingSignalService } from '../../../signals/loading-signal/loading-signal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  private router = inject(Router)
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService);
  private userSignal = inject(UserSignalService);
  private loadingSignal = inject(LoadingSignalService);
  private localStorageService = inject(LocalStoreService);

  formUser: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  saveUser(user: User){
    this.userSignal.setLocalUser(user)
    this.localStorageService.saveUserToLocalStorage(user)
  }

  submitLogin(){
    this.loadingSignal.setLoadingStatus(true)
    this.authService.login(this.formUser.value).subscribe(
      (loginResult: any) => {
        this.toastrService.success(loginResult.message)
        this.saveUser(loginResult.user)
        this.router.navigateByUrl('/')
      },
      (errorLogin) => {
        this.toastrService.error(errorLogin.message)
      },
      () => {
        this.loadingSignal.setLoadingStatus(false)
      }
    )
  }
}
