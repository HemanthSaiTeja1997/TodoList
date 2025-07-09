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
export class App {
  showViewTaskButton:boolean=true;
  showViewButton(){
    this.showViewTaskButton=!this.showViewTaskButton;
  }
  showViewButton2(){
    this.showViewTaskButton=!this.showViewTaskButton;
this.showViewTaskButton=true;
  }
}
