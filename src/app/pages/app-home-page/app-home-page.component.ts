import { Component } from '@angular/core';
import { AppCardListComponent } from '../../organisms/app-card-list/app-card-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AppCardListComponent],
  templateUrl: './app-home-page.component.html',
  styleUrls: ['./app-home-page.component.scss']
})
export class AppHomePageComponent {}
