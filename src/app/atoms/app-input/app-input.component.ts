import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss']
})
export class AppInputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(val: string) {
    this.value = val;
    this.valueChange.emit(val);
  }
}
