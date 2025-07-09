import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedButton } from "../shared-button/shared-button";

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, SharedButton],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
    showViewTaskButton: boolean = true;
  displayButton() :void {
    this.showViewTaskButton = !this.showViewTaskButton;
  }
  displayButton2():void {
    this.showViewTaskButton = !this.showViewTaskButton;
    this.showViewTaskButton = true;
  }

}
