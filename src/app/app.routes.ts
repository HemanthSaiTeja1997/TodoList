import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'updateTodo/:id',
        loadComponent:()=>import('./components/update-todo/update-todo').then((m)=>m.UpdateTodo)
    },
     {path:'viewTodo',
        loadComponent:()=>import('./components/ViewTodo/todo').then((m)=>m.Todo)
    },
         {path:'addTodo',
        loadComponent:()=>import('./components/add-todo/add-todo').then((m)=>m.AddTodo)
    }
];
