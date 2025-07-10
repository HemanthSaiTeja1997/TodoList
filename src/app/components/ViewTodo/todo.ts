import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Itodo } from '../../interface/itodo';
import { Router } from '@angular/router';
import { SharedButton } from '../shared-button/shared-button';
import { ButtonLabel } from '../../button-labels.enum';
import { ToastrService } from 'ngx-toastr';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TodoSearchFilterPipe } from '../../pipes/todo-search-filter-pipe';
import { SharedInput } from "../shared-input/shared-input";

@Component({
  selector: 'app-todo',
  imports: [
    CommonModule,
    FormsModule,
    SharedButton,
    InfiniteScrollDirective,
    TodoSearchFilterPipe,
    SharedInput
],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  buttonLabel = ButtonLabel;

  searchTerm: string = '';
  filteredTodoList: Itodo[] = [];
  displayedUsers: any[] = []; // Data shown with infinite scroll
  page: number = 0;
  pageSize: number = 10;
  loading: boolean = false;
  constructor(
    private todoservice: TodoService,
    private route: Router,
    private toastMessage: ToastrService
  ) {}
  TodoList: Itodo[] = [];
  subscription!: Subscription;

  listOfTodo!: Observable<Itodo[]>;
  ngOnInit(): void {
    this.getTodoList();
  }
  loadMoreUsers() {
    if (this.loading) return;

    this.loading = true;
    const start = this.page * this.pageSize;
    const end = start + this.pageSize;

    const nextChunk = this.filteredTodoList.slice(start, end);
    setTimeout(() => {
      this.displayedUsers = [...this.displayedUsers, ...nextChunk];
      this.page++;
      this.loading = false;
    }, 500);
  }
  getTodoList(): void {
    this.listOfTodo = this.todoservice.apiRequest<Itodo[]>(
      this.buttonLabel.GET,
      '/'
    );
  }

  updateUser(id: number): void {
    this.route.navigate([this.buttonLabel.routeToUpdateTodo, id]);
  }
  ondelete(id: number): void {
    const deleteSubscription: Subscription = this.todoservice
      .apiRequest<void>(this.buttonLabel.DELETE, `/${id}`)
      .subscribe({
        next: () => {
          this.getTodoList();
          this.toastMessage.success('Todo Deleted Succussfully!');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toastMessage.error('Failed Deleting Task');
        },
        complete: () => {
          if (!deleteSubscription.closed) {
            deleteSubscription.unsubscribe();
          }
        },
      });
  }
}
