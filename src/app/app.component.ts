import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UserSignalService } from './signals/user/user-signal.service';
import { AuthService } from './services/auth/auth.service';
import { LocalStoreService } from './services/localStore/local-store.service';
import { LoadingSignalService } from './signals/loading-signal/loading-signal.service';
import { LoadingComponent } from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TaskFlow';
  protected authService = inject(AuthService)
  protected userSignal = inject(UserSignalService);
  protected loadingSignal = inject(LoadingSignalService)
  private localStorageService = inject(LocalStoreService)
  isShowLoading: boolean = false;
  constructor() {
    this.setUser()
    effect(() => {
      this.isShowLoading = this.loadingSignal.getLoadingStatus()
    })
  }

  setUser(){
    const user: any = this.localStorageService.getUserToLocalStorage()
    if(user){
      this.userSignal.setLocalUser(user)
    }
  }
}
