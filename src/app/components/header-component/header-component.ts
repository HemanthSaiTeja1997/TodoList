import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedButton } from '../shared-button/shared-button';
import { RouterOutlet } from '@angular/router';
import { APP_CONSTANTS } from '../../constants';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, SharedButton, RouterOutlet],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
})
export class HeaderComponent {
  constants=APP_CONSTANTS;
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
