import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-input',
  imports: [FormsModule],
  templateUrl: './shared-input.html',
  styleUrl: './shared-input.scss'
})
export class SharedInput {
 @Input() placeholder: string = 'Enter text';
  @Input() modelValue: string = '';
  @Output() modelValueChange = new EventEmitter<string>();
  onInputChange(value: string):void {
  this.modelValue = value;
  this.modelValueChange.emit(value);
}
}
