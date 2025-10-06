import { Component, Output, EventEmitter, Input, forwardRef } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatLabel, MatFormField, MatIconModule, MatInputModule],
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
  searchValue: string = '';
  @Input() label: string = 'Search...';
  @Input() placeholder: string = 'Type to search...';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
