import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private toastrService = inject(ToastrService)
  formUser: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
      createdAt: new FormControl('')
    }
  )

  constructor(){
    const passwordControl = this.formUser.get('password')!
    const repeatPasswordControl = this.formUser.get('repeatPassword')!
    this.formUser.addValidators(
      this.comparePasswordsValidator(passwordControl, repeatPasswordControl)
    )
  }

  submitUserRegister(){
    this.formUser.get('createdAt')?.setValue(new Date())
    this.authService.register(this.formUser.value).subscribe(
      (registerResult: any) => {
        this.toastrService.success(registerResult.message)
      },
      (error) => {
        console.log("error: ", error)
        this.toastrService.error(error)
      }
   )
  }

  comparePasswordsValidator(password: AbstractControl, repeatPassword: AbstractControl) {
    return () => {
    if (password.value !== repeatPassword.value)
      return { match_error: 'As duas senhas não se coincidem' };
    return null;
  };

}
}
