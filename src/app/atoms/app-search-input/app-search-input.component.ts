import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app-search-input.component.html',
  styleUrls: ['./app-search-input.component.scss']
})
export class AppSearchInputComponent {
  @Input() value: string = '';
  @Input() placeholder: string = '';
}
