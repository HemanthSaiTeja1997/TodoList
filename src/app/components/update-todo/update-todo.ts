import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Itodo } from '../../interface/itodo';
import { take } from 'rxjs';

@Component({
  selector: 'app-update-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './update-todo.html',
  styleUrl: './update-todo.scss',
})
export class UpdateTodo implements OnInit {
  updateTodoFrom: FormGroup;
  constructor(
    private todoService: TodoService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.updateTodoFrom = this.fb.group({
      id: [''],
      description: [''],
      status: ['Pending'],
    });
  }
  todoData: any;
  todoId!: {
    tid: number;
  };

  ngOnInit(): void {
    this.todoId = {
      tid: this.activeRoute.snapshot.params['id'],
    };
    this.todoService
      .request<Itodo>('GET', `/${this.todoId.tid}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.todoData = res;
          this.updateTodoFrom.setValue({
            id: this.todoData.id,
            description: this.todoData.description,
            status: this.todoData.status,
          });
        },
      });
  }
      onSubmit() {
    this.todoService
      .request<Itodo>('PUT', `/${this.todoId.tid}`, this.updateTodoFrom.value)
      .subscribe({
        next: () => {
          this.route.navigateByUrl('viewTodo');
          this.todoService.triggerTodoListRefresh();
        }
      });
  }
}
