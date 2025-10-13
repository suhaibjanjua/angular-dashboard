import { Component, Input } from '@angular/core';
import { AppLogoComponent } from '../../atoms/app-logo/app-logo.component';

@Component({
  selector: 'app-logo-title',
  standalone: true,
  imports: [AppLogoComponent],
  templateUrl: './app-logo-title.component.html',
  styleUrls: ['./app-logo-title.component.scss']
})
export class AppLogoTitleComponent {
  @Input({ required: true }) brandName!: string;
  @Input() showLogo: boolean = false;
}
