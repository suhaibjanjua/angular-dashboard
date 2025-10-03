import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatIconModule],
  templateUrl: './app-search-bar.component.html',
  styleUrls: ['./app-search-bar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSearchBarComponent),
      multi: true
    }
  ]
})
export class AppSearchBarComponent {
  @Input() label = 'Search...';
  @Input() placeholder = 'Type to search...';

  value = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  // When the form initializes or updates, Angular calls
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }
}
