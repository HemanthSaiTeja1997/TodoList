import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from './services/todo-service';
import { Itodo } from './interface/itodo';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit{
  protected title = 'todo';
  addTodoList: FormGroup;
  constructor(private fb: FormBuilder, private todoservice: TodoService,private router:Router) {
    this.addTodoList = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(0)]],
      status: 'Pending',
    });
  }
  ngOnInit(): void {
    this.router.navigateByUrl('viewTodo')
  }
  onSubmit() {
    let { description, status } = this.addTodoList.value;

    console.log('onSubmit called',this.addTodoList.valid);
    console.log('onSubmit called',this.addTodoList.value);

    if (this.addTodoList.valid && description?.trim() && status?.trim()) {
      let postSubsription: Subscription = this.todoservice
        .request<Itodo>('POST', '/', this.addTodoList.value)
        .subscribe({
          next: () => {
            this.todoservice.triggerTodoListRefresh();
            this.addTodoList.reset({ status: 'Pending' });
          },
          error: (error) => {
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
