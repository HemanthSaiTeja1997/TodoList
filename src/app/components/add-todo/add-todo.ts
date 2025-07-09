import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Itodo } from '../../interface/itodo';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.scss'
})
export class AddTodo {
  addTodoList: FormGroup;
  constructor(private fb: FormBuilder, private todoservice: TodoService,private router:Router) {
    this.addTodoList = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(0)]],
      status: 'Pending',
    });
  }
  onSubmit() :void {
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
