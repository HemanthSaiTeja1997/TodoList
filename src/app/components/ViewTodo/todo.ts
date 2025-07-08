import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Itodo } from '../../interface/itodo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo implements OnInit {
  searchTerm: string = '';
  filteredTodoList: Itodo[] = [];
  constructor(private todoservice: TodoService, private route: Router) {}
  TodoList: Itodo[] = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.todoservice.todoListUpdates$.subscribe({
      next: () => {
        this.getTodoList();
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  filterTodoList() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredTodoList = this.TodoList;
      return;
    }

    this.filteredTodoList = this.TodoList.filter(
      (todo) =>
        todo.description.toLowerCase().includes(term) ||
        todo.status.toLowerCase().includes(term)
    );
  }
  getTodoList() {
    let getSubscription: Subscription = this.todoservice.request<Itodo[]>('GET', '/').subscribe({
      next: (res) => {
        console.log(res);
        this.TodoList = res;
        this.filterTodoList();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        if (!getSubscription.closed) {
          getSubscription.unsubscribe();
        }
      }
    });
  }

  updateUser(id: number) {
    this.route.navigate(['updateTodo', id]);
  }
  ondelete(id: number) {
    this.todoservice.request<void>('DELETE', `/${id}`).subscribe({
      next: () => {
        this.getTodoList();
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again later.');
      },
    });
  }
}
