import { Component, inject, Inject } from '@angular/core';
import { FormTaskComponent } from '../../../components/form-task/form-task.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskService } from '../../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingSignalService } from '../../../signals/loading-signal/loading-signal.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormTaskComponent],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  private taskService = inject(TaskService)
  private toastrService = inject(ToastrService)
  private loadingSignal = inject(LoadingSignalService)
  constructor(@Inject(MAT_DIALOG_DATA) public task: any) { 
    console.log("data: ", task)
  }

  editTask(formEdit: any){
    this.loadingSignal.setLoadingStatus(true)
    console.log("id: ", this.task.id)
    this.taskService.editTask(this.task.id, formEdit).subscribe((editTaskResult: any) => {
      this.toastrService.success(editTaskResult?.message)
      this.loadingSignal.setLoadingStatus(false)
      window.location.reload()
    })
  }

  deleteTask(){
    this.taskService.deleteTask(this.task.id).subscribe((response: any) => {
      this.toastrService.success(response)
      window.location.reload()
    })
  }
}
