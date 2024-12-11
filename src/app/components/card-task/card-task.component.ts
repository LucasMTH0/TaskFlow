import { Component, Input } from '@angular/core';
import { Task } from '../../types/Task';

@Component({
  selector: 'app-card-task',
  standalone: true,
  imports: [],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {
  @Input() task: any = {}; 
}
