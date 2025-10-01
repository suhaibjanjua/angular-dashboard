import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventDropArg, EventClickArg, DateSelectArg, EventAddArg, EventChangeArg, EventRemoveArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { MatCardModule } from '@angular/material/card';

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

  calendarOptions: CalendarOptions = {
    // 📦 Plugins
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],

    // 📅 Initial View
    initialView: 'dayGridMonth',

    // 🧭 Header Toolbar Configuration
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek today',
      center: 'title',
      right: 'prev,next'
    },

    // 🌙 Footer Toolbar Configuration (optional)
    // footerToolbar: {
    //   left: 'prev,next today',
    //   center: 'title',
    //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    // },

    // 📖 Text Customization
    allDayText: 'All Day',
    noEventsText: 'No events to display',
    moreLinkText: 'more',

    // 🌐 Button Text Customization
    buttonText: {
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      list: 'List'
    },

    // 📆 Calendar Behavior
    weekends: true,           // Show weekends
    firstDay: 1,              // Start week on Monday

    // 🎨 Styling & Layout
    // height: '100vh',       // Responsive height (optional)
    // contentHeight: 600,    // Fixed content height (optional)
    // aspectRatio: 1.5,      // Width/height ratio (optional)
    eventColor: '#6c4bb6',    // Default event background color
    eventTextColor: '#fff',   // Default event text color

    // 🧠 Interactivity
    editable: true,           // Enables drag, drop, and resize
    selectable: true,         // Enables date selection
    selectMirror: true,       // Shows placeholder during selection
    longPressDelay: 300,      // Mobile-friendly interaction delay
    droppable: true,          // Enables external drag sources

    // 📌 Event Data
    events: [
      { id: '1', title: 'Design Review', start: this.todayOffset(0), end: this.todayOffset(2), editable: true },
      { id: '2', title: 'Sprint Planning', start: this.todayOffset(1), editable: true },
      { id: '3', title: 'Team Lunch', start: this.todayOffset(2), editable: true },
      { id: '4', title: 'Deployment', start: this.todayOffset(2), editable: true },
      { id: '5', title: 'Meeting', start: this.todayOffset(2), editable: true },
      { id: '6', title: 'Touchpoint with Client', start: this.todayOffset(2), editable: true },
    ],

    // 📚 Event Stacking & Overlap
    eventOverlap: true,       // Allow overlapping events
    dayMaxEvents: false,       // Enables "+n more" link
    dayMaxEventRows: 4,       // Max visible rows per day

    // 🔁 Event Lifecycle Hooks
    eventDrop: (info: EventDropArg) => console.log('Event dropped:', info),
    eventClick: (info: EventClickArg) => console.log('Event clicked:', info.event.title),
    eventResize: (info: EventResizeDoneArg) => console.log('Event resized:', info),
    select: (info: DateSelectArg) => console.log('Date selected:', info.startStr, 'to', info.endStr),

    // 🎨 Custom Rendering Hooks
    eventDidMount: (info) => {
      // Add tooltips, icons, or custom HTML
      // info.el.setAttribute('title', info.event.title);
    },
    dayCellDidMount: (info) => {
      // Custom styling per day cell
    },

    // ✅ Drop Validation
    eventAllow: (dropInfo, draggedEvent) => {
      // Always allow drop, or add custom logic
      return true;
    },

    // 🌐 Localization & Time Formatting
    locales: [frLocale],       // Available locales
    locale: 'en',             // Language (e.g., 'fr' for French)
    timeZone: 'local',        // Use local time zone
    slotLabelFormat: {        // Time labels in timeGrid views
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    eventTimeFormat: {        // Time format for event display
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },

    // 🧭 Advanced Features
    nowIndicator: true,       // Show current time line
    eventOrder: 'start,-duration,title', // Sort events

    // 🧠 UX Enhancements
    unselectAuto: true,       // Automatically unselect after user action
    // selectConstraint: 'businessHours',   // Restrict selection to business hours
    // eventConstraint: 'businessHours',    // Restrict dragging/resizing to business hours
    // businessHours: {
    //   daysOfWeek: [1, 2, 3, 4, 5],       // Monday to Friday
    //   startTime: '09:00',
    //   endTime: '18:00'
    // },

    // 🧪 Developer Debugging Hooks
    eventAdd: (addInfo: EventAddArg) => console.log('Event added:', addInfo.event),
    eventChange: (changeInfo: EventChangeArg) => console.log('Event changed:', changeInfo.event),
    eventRemove: (removeInfo: EventRemoveArg) => console.log('Event removed:', removeInfo.event),

    // 🧼 Cleanup & Safety
    handleWindowResize: true,        // Recalculate layout on window resize
    eventDurationEditable: true,     // Allow resizing event duration
    eventStartEditable: true,        // Allow dragging event start time

    // 🔍 View-Specific Configs (optional)
    // views: {
    //   timeGridWeek: {
    //     slotDuration: '00:30:00',
    //     slotLabelInterval: '01:00',
    //     slotMinTime: '08:00:00',
    //     slotMaxTime: '20:00:00',
    //   }
    // }
  };


  private todayOffset(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

}
