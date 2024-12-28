import { Component, Output, EventEmitter } from '@angular/core';
import { AppSearchInputComponent } from '../../atoms/app-search-input/app-search-input.component';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [AppSearchInputComponent, AppButtonComponent, FormsModule],
  templateUrl: './app-search-bar.component.html',
  styleUrls: ['./app-search-bar.component.scss']
})
export class AppSearchBarComponent {
  searchValue: string = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchValue);
  }
}
