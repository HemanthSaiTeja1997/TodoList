import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Itodo } from '../../interface/itodo';
import { TodoSearchFilterPipe } from '../../pipes/todo-search-filter-pipe';
import { TodoService } from '../../services/todo-service';
import { SharedButton } from '../shared-button/shared-button';
import { SharedInput } from '../shared-input/shared-input';
import { ApiMethods } from '../../apiMethods.enum';
import { APP_CONSTANTS } from '../../constants';
import { LoggerService } from '../../services/logger-service';

@Component({
  selector: 'app-todo',
  imports: [
    CommonModule,
    FormsModule,
    SharedButton,
    InfiniteScrollDirective,
    TodoSearchFilterPipe,
    SharedInput,
  ],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  apiMethods = ApiMethods;
  constants = APP_CONSTANTS;
  searchTerm: string = '';
  displayedTodoList: Itodo[] = []; // Data shown with infinite scroll
  page: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  constructor(
    private todoservice: TodoService,
    private route: Router,
    private toastMessage: ToastrService,
    private logger: LoggerService
  ) {}
  TodoList: Itodo[] = [];
  subscription!: Subscription;

  listOfTodo!: Observable<Itodo[]>;
  ngOnInit(): void {
    this.getTodoList();
  }
  loadMoreUsers(): void {
    if (this.loading) return;

    this.loading = true;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    const nextChunk = this.TodoList.slice(start, end);
    setTimeout(() => {
      this.displayedTodoList = [...this.displayedTodoList, ...nextChunk];
      this.page++;
      this.loading = false;
    }, 500);
  }
  getTodoList(): void {
    this.listOfTodo = this.todoservice.apiRequest<Itodo[]>(
      this.apiMethods.GET,
      '/'
    );
  }

  updateUser(id: number): void {
    this.route.navigate([this.constants.ROUTE_TO_UPDATE_TODO, id]);
  }
  ondelete(id: number): void {
    const deleteSubscription: Subscription = this.todoservice
      .apiRequest<void>(this.apiMethods.DELETE, `/${id}`)
      .subscribe({
        next: () => {
          this.getTodoList();
          this.toastMessage.success(
            this.constants.TOAST_TASK_DELETE_SUCCESS_MESSAGE
          );
        },
        error: (error) => {
          this.logger.logWithError('Error Deleting Todo', error);
          this.toastMessage.error(
            this.constants.TOAST_TASK_DELETE_FAILED_MESSAGE
          );
        },
        complete: () => {
          if (!deleteSubscription.closed) {
            deleteSubscription.unsubscribe();
          }
        },
      });
  }
}
