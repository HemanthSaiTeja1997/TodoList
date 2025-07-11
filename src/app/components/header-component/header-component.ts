import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedButton } from '../shared-button/shared-button';
import { ButtonLabel } from '../../button-labels.enum';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, SharedButton, RouterOutlet],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  buttonLabel = ButtonLabel;
  showViewTaskButton: boolean = true;
  showAddTodoButton: boolean = true;
  displayButton(): void {
    this.showViewTaskButton = false;
    this.showAddTodoButton = true;
  }
  displayButton2(): void {
    this.showAddTodoButton = false;
    this.showViewTaskButton = true;
  }
}
