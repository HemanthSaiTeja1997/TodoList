import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-button',
  imports: [RouterLink, NgIf],
  templateUrl: './shared-button.html',
  styleUrl: './shared-button.scss',
})
export class SharedButton {
  @Input() label: string = 'Button';
  @Input() customClass: string = 'btn';
  @Input() route: string = '';
  @Input() isDeleteButton: boolean = false;
  @Input() isVisible: boolean = true;
  @Output() onClickEvent = new EventEmitter();
  clickHandler() {
    this.onClickEvent.emit('button clicked');
  }
}
