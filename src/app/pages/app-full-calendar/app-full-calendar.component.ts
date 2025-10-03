import { Component, inject } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { MatCardModule } from '@angular/material/card';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-app-full-calendar',
  imports: [FullCalendarModule, MatCardModule],
  template: `
    <div class="page-container">

      <div class="page-header">
        <h1 class="page-title">Calendar</h1>
        <p class="page-subtitle">Plan, track, and manage your events and schedules</p>
      </div>

      <mat-card class="content-card">
        <mat-card-header></mat-card-header>
        <mat-card-content>
          <full-calendar [options]="calendarOptions"></full-calendar>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './app-full-calendar.component.scss'
})
export class AppFullCalendarComponent {

  readonly calendarService = inject(CalendarService);

  calendarOptions!: CalendarOptions;

  constructor() {
    this.calendarOptions = this.calendarService.getCalendarOptions();
  }

}
