import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Itodo } from '../../interface/itodo';
import { Subscription, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TodoForm } from '../todo-form/todo-form';
import { ApiMethods } from '../../apiMethods.enum';
import { APP_CONSTANTS } from '../../constants';
import { LoggerService } from '../../services/logger-service';

@Component({
  selector: 'app-update-todo',
  imports: [ReactiveFormsModule, TodoForm],
  templateUrl: './update-todo.html',
  styleUrl: './update-todo.scss',
})
export class UpdateTodo implements OnInit {
  updateTodoForm: FormGroup;
  apiMethods = ApiMethods;
  constants=APP_CONSTANTS;

  constructor(
    private todoService: TodoService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private toastMessage: ToastrService,
    private logger:LoggerService
  ) {
    this.updateTodoForm = this.fb.group({
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
    this.loadTodoData();
  }
  loadTodoData(): void {
    this.todoId = {
      tid: this.activeRoute.snapshot.params['id'],
    };
    this.todoService
      .apiRequest<Itodo>(this.apiMethods.GET, `/${this.todoId.tid}`)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.todoData = res;
          this.updateTodoForm.setValue({
            id: this.todoData.id,
            description: this.todoData.description,
            status: this.todoData.status,
          });
        },
      });
  }
  onSubmit(): void {
    const updateSubsription: Subscription = this.todoService
      .apiRequest<Itodo>(
        this.apiMethods.PUT,
        `/${this.todoId.tid}`,
        this.updateTodoForm.value
      )
      .subscribe({
        next: () => {
          this.toastMessage.success(this.constants.TOAST_TASK_UPDATE_SUCCESS_MESSAGE);
          this.route.navigateByUrl(this.constants.ROUTE_TO_VIEW_TODO);
        },
        error: (error) => {
          this.toastMessage.error(this.constants.TOAST_TASK_UPDATE_FAILED_MESSAGE);
          this.logger.logWithError("Something wrong with update Todo",error)
        },
        complete: () => {
          if (updateSubsription.closed) {
            updateSubsription.unsubscribe();
          }
        },
      });
  }
}
