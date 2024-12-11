import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TypesService } from '../../services/types/types.service';

@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatCheckboxModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatIconModule, MatDialogActions, MatDialogClose, MatButton],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.scss'
})
export class FormTaskComponent implements OnInit{
  protected taskTypesService = inject(TypesService)
  @Input() task: any = null;
  @Input() variant: "register" | "edit" = "register";
  @Output() formTaskEmitter = new EventEmitter()
  @Output() deleteTaskEmitter = new EventEmitter()

  formTask: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    done: new FormControl(false),
    dateLimit: new FormControl('', [Validators.required]),
    createdAt: new FormControl('')
 })

 deleteTask(){
  this.deleteTaskEmitter.emit(true)
 }

 ngOnInit(): void {
    if(this.task){
      this.formTask.get('title')?.setValue(this.task?.title);
      this.formTask.get('description')?.setValue(this.task?.description);
      this.formTask.get('done')?.setValue(this.task?.done);
      this.formTask.get('dateLimit')?.setValue(this.task?.dateLimit);
      this.formTask.get('createdAt')?.setValue(this.task.createdAt)
    }
 }

 formSubmit(){
  this.formTaskEmitter.emit(this.formTask.value)
  this.formTask.reset()
 }

}
