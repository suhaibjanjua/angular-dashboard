import { Component } from '@angular/core';
import { AppCardComponent } from '../app-card/app-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [AppCardComponent, CommonModule],
  templateUrl: './app-card-list.component.html',
  styleUrls: ['./app-card-list.component.scss']
})
export class AppCardListComponent {
  cards = [
    { title: 'Card One', image: '', description: 'This is the first card.' },
    { title: 'Card Two', image: '', description: 'This is the second card.' },
    { title: 'Card Three', image: '', description: 'This is the third card.' },
    { title: 'Card Four', image: '', description: 'This is the fourth card.' },
    { title: 'Card Five', image: '', description: 'This is the fifth card.' },
    { title: 'Card Six', image: '', description: 'This is the sixth card.' }
  ];
  filteredCards = [...this.cards];

  filterCards(search: string) {
    const term = search.toLowerCase();
    this.filteredCards = this.cards.filter(card => card.title.toLowerCase().includes(term));
  }
}
