import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ButtonLabel } from '../../button-labels.enum';
import { Itodo } from '../../interface/itodo';
import { TodoService } from '../../services/todo-service';
import { SharedButton } from "../shared-button/shared-button";
import { HeaderComponent } from "../header-component/header-component";
import { TodoForm } from "../todo-form/todo-form";
@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule, CommonModule, TodoForm],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss',
})
export class AddTodo {
  addTodoList: FormGroup;
  buttonLabel = ButtonLabel; 
  
  constructor(
    private fb: FormBuilder,
    private todoservice: TodoService,
    private router: Router,
    private toastMessage:ToastrService
  ) {
    this.addTodoList = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(0)]],
      status: 'Pending',
    });
  }
  onSubmit(): void {
    const { description, status } = this.addTodoList.value;
    if (this.addTodoList.valid && description?.trim() && status?.trim()) {
      const postSubsription: Subscription = this.todoservice
        .apiRequest<Itodo>(this.buttonLabel.POST, '/', this.addTodoList.value)
        .subscribe({
          next: () => {
            this.toastMessage.success("Task Added Successfully!");
            this.addTodoList.reset({ status: 'Pending' });
          },
          error: (error) => {
            this.toastMessage.error("Failed Adding Todo Task!");
            console.error(error);
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
