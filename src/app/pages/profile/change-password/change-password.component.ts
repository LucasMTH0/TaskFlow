import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  editUserPassword = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(5)])
  })
}
