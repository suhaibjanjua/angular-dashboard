
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-dashboard';
  
  private readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    // Initialize the theme service
    this.themeService.initializeTheme();
  }
}
