import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Itodo } from '../../interface/itodo';
import { TodoService } from '../../services/todo-service';
import { TodoForm } from '../todo-form/todo-form';
import { ApiMethods } from '../../apiMethods.enum';
import { APP_CONSTANTS } from '../../constants';
import { LoggerService } from '../../services/logger-service';
@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule, CommonModule, TodoForm],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo {
  addTodoList: FormGroup;
  apiMethods = ApiMethods;
  constants = APP_CONSTANTS;

  constructor(
    private fb: FormBuilder,
    private todoservice: TodoService,
    private toastMessage: ToastrService,
    private logger: LoggerService
  ) {
    this.addTodoList = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(0)]],
      status: 'Pending',
    });
  }
  onSubmit(): void {
    const { description, status } = this.addTodoList.value;
    if (this.addTodoList.invalid) {
      this.toastMessage.warning(
        this.constants.TOAST_TASK_ADD_DESCRIPTION_MESSAGE
      );
    }
    if (this.addTodoList.valid && description?.trim() && status?.trim()) {
      const postSubsription: Subscription = this.todoservice
        .apiRequest<Itodo>(this.apiMethods.POST, '/', this.addTodoList.value)
        .subscribe({
          next: () => {
            this.toastMessage.success(
              this.constants.TOAST_TASK_ADD_SUCCESS_MESSAGE
            );
            this.addTodoList.reset({ status: 'Pending' });
          },
          error: (error) => {
            this.toastMessage.error(
              this.constants.TOAST_TASK_ADD_FAILED_MESSAGE
            );
            this.logger.logWithError('Somthing went wrong in Add Todo', error);
          },
          complete: () => {
            if (postSubsription.closed) {
              postSubsription.unsubscribe();
            }
          },
        });
    }
  }
}
