import {  Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TodoService } from '../../services/todo-service';
import { Itodo } from '../../interface/itodo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss'
})
export class AddTodo {
  addTodoList: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private todoservice:TodoService,
  ) {
    this.addTodoList = this.fb.group({
      description: ['',[Validators.required]],
      status:"Pending",
    });
  }
  onSubmit() {
    this.todoservice.request<Itodo>('POST', '/', this.addTodoList.value).subscribe({
      next: () => {
        this.todoservice.triggerTodoListRefresh();
        this.addTodoList.reset()
      }
    });
  }



}
