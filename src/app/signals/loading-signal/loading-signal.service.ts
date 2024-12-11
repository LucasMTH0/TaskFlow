import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSignalService {
  private loadingSignal = signal(false)
  constructor() { }

  getLoadingStatus(){
    const isLoadingVisible = this.loadingSignal.asReadonly()
    return isLoadingVisible()
  }

  setLoadingStatus(value: boolean){
    this.loadingSignal.set(value)
  }

}
