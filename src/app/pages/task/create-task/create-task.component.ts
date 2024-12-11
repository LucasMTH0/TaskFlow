import { FormTaskComponent } from '../../../components/form-task/form-task.component';
import {TaskService} from '../../../services/task/task.service';
import {Component, inject} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { UserSignalService } from '../../../signals/user/user-signal.service';
import { LoadingSignalService } from '../../../signals/loading-signal/loading-signal.service';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [FormTaskComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  protected taskService = inject(TaskService);
  protected toastrService = inject(ToastrService);
  protected userSignal = inject(UserSignalService);
  private loadingSignal = inject(LoadingSignalService)

  submitTaskForm(formTask: any) {
    this.loadingSignal.setLoadingStatus(true);
    const user = this.userSignal.getLocalUser()
    this.taskService.createTask({...formTask, createdAt: new Date(), userID: user?.id}).subscribe(
      (createTaskResponse: any) => {
        this.toastrService.success(createTaskResponse.message)
      },
      (createTaskError) => {
        this.toastrService.error(createTaskError.message)
      },
      () => {
        this.loadingSignal.setLoadingStatus(false);
      }
    )

  }

}
