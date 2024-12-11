import { Component, effect, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { UserSignalService } from '../../signals/user/user-signal.service';
import { User } from '../../types/User';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected userSignal = inject(UserSignalService)
  private authService = inject(AuthService)
  protected router = inject(Router)
  userLogged: any = null;

  constructor(){
    effect(() => {
      this.userLogged = this.userSignal.getLocalUser()
      console.log("user signal: ", this.userLogged)
    })
  }

  logout(){
    this.authService.logout()
  }


}

//router.navigateByUrl('/task/create')

