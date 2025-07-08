import { Routes } from '@angular/router';
import { UpdateTodo } from './components/update-todo/update-todo';
import { Todo } from './components/ViewTodo/todo';

export const routes: Routes = [
    {path:'updateTodo/:id',
        loadComponent:()=>import('./components/update-todo/update-todo').then((m)=>UpdateTodo)
    },
     {path:'viewTodo',
        loadComponent:()=>import('./components/ViewTodo/todo').then((m)=>Todo)
    },
    
];
