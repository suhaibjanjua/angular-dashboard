import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import Chart.js globally to register all controllers and elements for ng2-charts
import 'chart.js/auto';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
