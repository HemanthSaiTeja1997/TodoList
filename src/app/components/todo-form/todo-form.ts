import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedButton } from '../shared-button/shared-button';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, CommonModule, SharedButton],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.scss',
})
export class TodoForm {
  @Input() formGroup!: FormGroup;
  @Input() isEditMode: boolean = false;
  @Input() buttonLabel: string = 'Submit';
  @Input() route: string = '';
  @Input() showStatus: boolean = false;
  @Output() submitForm = new EventEmitter();
}
