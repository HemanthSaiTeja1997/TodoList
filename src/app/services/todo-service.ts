import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoListSubject = new BehaviorSubject<void>(undefined);
  todoListUpdates$ = this.todoListSubject.asObservable();
  private baseUrl=environment.apiUrl;
 constructor(private http:HttpClient) { }
  
  httpCall<T>(method:'GET'|'POST'|'PUT'|'DELETE',path:string='',body?:any) : Observable<T>{
    const url = `${this.baseUrl}${path}`;
    return this.http.request<T>(method,url,{body}).pipe(
      catchError(this.handleError)
    )
  }
  handleError(error: any) {
    console.error('Global Error Handler:', error);
    alert('Something went wrong! Please try again later.');
    return throwError(() => error);
  }
  triggerTodoListRefresh() {
    this.todoListSubject.next();
  }
}
