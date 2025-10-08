import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MeetingData, MeetingType, MeetingStatus } from '../../models';
import { ActionMenuItem } from '../../models/action.menu.model';
import { AppActionMenuComponent } from '../../molecules/app-action-menu/app-action-menu.component';
import { AppChipSetComponent } from '../../molecules/app-chip-set/app-chip-set.component';
import { AppPageHeaderCardComponent } from '../../molecules/app-page-header-card/app-page-header-card.component';

@Component({
  selector: 'app-meetings-page',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatBadgeModule,
    AppActionMenuComponent,
    AppChipSetComponent,
    AppPageHeaderCardComponent
  ],
  template: `
    <div class="page-container">
      <app-page-header-card [title]="'Meetings'" [subtitle]="'Schedule and manage virtual and in-person meetings'" [hasActions]="true">
        <div header-actions>
          <button mat-flat-button color="primary">
            <mat-icon>add</mat-icon>
            Schedule Meeting
          </button>
        </div>
      </app-page-header-card>

      <mat-card class="content-card">
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="meetings" class="meetings-table">
              <!-- Meeting Title Column -->
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef>Meeting</th>
                <td mat-cell *matCellDef="let meeting">
                  <div class="meeting-info">
                    <strong>{{meeting.title}}</strong>
                    <div class="meeting-type">
                      <app-chip-set [chipSet]="[{value: meeting.type}]"></app-chip-set>
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Organizer Column -->
              <ng-container matColumnDef="organizer">
                <th mat-header-cell *matHeaderCellDef>Organizer</th>
                <td mat-cell *matCellDef="let meeting">{{meeting.organizer}}</td>
              </ng-container>

              <!-- Date & Time Column -->
              <ng-container matColumnDef="dateTime">
                <th mat-header-cell *matHeaderCellDef>Date & Time</th>
                <td mat-cell *matCellDef="let meeting">
                  <div class="datetime-info">
                    <div>{{meeting.dateTime}}</div>
                    <div class="duration">{{meeting.duration}} min</div>
                  </div>
                </td>
              </ng-container>

              <!-- Participants Column -->
              <ng-container matColumnDef="participants">
                <th mat-header-cell *matHeaderCellDef>Participants</th>
                <td mat-cell *matCellDef="let meeting">
                  <div class="participants-info">
                    <mat-icon matBadge="{{meeting.participants}}" matBadgeColor="primary">
                      people
                    </mat-icon>
                    <span class="participant-count">{{meeting.participants}} / {{meeting.maxParticipants}}</span>
                  </div>
                </td>
              </ng-container>

              <!-- Location Column -->
              <ng-container matColumnDef="location">
                <th mat-header-cell *matHeaderCellDef>Location</th>
                <td mat-cell *matCellDef="let meeting">
                  <div class="location-info">
                    <mat-icon class="location-icon">
                      {{meeting.meetingUrl ? 'videocam' : 'location_on'}}
                    </mat-icon>
                    {{meeting.location}}
                  </div>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let meeting">
                  <app-chip-set [chipSet]="[{value: meeting.status}]"></app-chip-set>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let meeting">
                  <app-action-menu [actions]="getMeetingActions(meeting)"></app-action-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
          
          <mat-paginator 
            [pageSizeOptions]="[5, 10, 20]" 
            showFirstLastButtons>
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './app-meetings-page.component.scss'
})
export class AppMeetingsPageComponent {
  displayedColumns: string[] = ['title', 'organizer', 'dateTime', 'participants', 'location', 'status', 'actions'];

  meetingActionsMap = new Map<MeetingData, ActionMenuItem[]>();
  
  meetings: MeetingData[] = [
    {
      id: 1,
      title: 'Weekly Team Standup',
      type: MeetingType.DISCUSSION,
      organizer: 'Sarah Johnson',
      dateTime: 'Today, 10:00 AM',
      duration: 30,
      participants: 8,
      maxParticipants: 12,
      status: MeetingStatus.IN_PROGRESS,
      location: 'Google Meet',
      meetingUrl: 'https://meet.google.com/abc-xyz'
    },
    {
      id: 2,
      title: 'Advanced Mathematics Final Exam',
      type: MeetingType.EXAM,
      organizer: 'Dr. Michael Chen',
      dateTime: 'Tomorrow, 2:00 PM',
      duration: 120,
      participants: 25,
      maxParticipants: 30,
      status: MeetingStatus.SCHEDULED,
      location: 'Room 201',
    },
    {
      id: 3,
      title: 'Project Presentation',
      type: MeetingType.PRESENTATION,
      organizer: 'Emily Davis',
      dateTime: 'Dec 20, 11:00 AM',
      duration: 60,
      participants: 15,
      maxParticipants: 20,
      status: MeetingStatus.SCHEDULED,
      location: 'Zoom',
      meetingUrl: 'https://zoom.us/j/123456789'
    },
    {
      id: 4,
      title: 'Physics Lab Session',
      type: MeetingType.WORKSHOP,
      organizer: 'Prof. James Wilson',
      dateTime: 'Dec 18, 3:00 PM',
      duration: 180,
      participants: 12,
      maxParticipants: 16,
      status: MeetingStatus.COMPLETED,
      location: 'Physics Lab A'
    },
    {
      id: 5,
      title: 'Literature Discussion Group',
      type: MeetingType.DISCUSSION,
      organizer: 'Dr. Lisa Anderson',
      dateTime: 'Dec 22, 1:00 PM',
      duration: 90,
      participants: 18,
      maxParticipants: 25,
      status: MeetingStatus.SCHEDULED,
      location: 'Library Conference Room'
    }
  ];

  getStatusColor(status: MeetingStatus): 'primary' | 'accent' | 'warn' | undefined {
    switch (status) {
      case MeetingStatus.IN_PROGRESS: return 'primary';
      case MeetingStatus.SCHEDULED: return 'accent';
      case MeetingStatus.COMPLETED: return undefined;
      case MeetingStatus.CANCELLED: return 'warn';
      default: return undefined;
    }
  }

  getTypeColor(type: MeetingType): 'primary' | 'accent' | 'warn' | undefined {
    switch (type) {
      case MeetingType.LECTURE: return 'primary';
      case MeetingType.DISCUSSION: return 'accent';
      case MeetingType.PRESENTATION: return 'primary';
      case MeetingType.EXAM: return 'warn';
      case MeetingType.WORKSHOP: return 'accent';
      default: return undefined;
    }
  }

  getMeetingActions(meeting: MeetingData): ActionMenuItem[] {
    if (!this.meetingActionsMap.has(meeting)) {
      console.log('Generating actions for meeting:', meeting.title);
      this.meetingActionsMap.set(meeting, [
        {
          label: 'Join Meeting',
          icon: 'videocam',
          callback: () => console.log('Join meeting', meeting),
          disabled: meeting.status !== 'In Progress'
        },
        {
          label: 'Edit meeting',
          icon: 'edit_calendar',
          callback: () => console.log('Edit meeting', meeting),
          disabled: meeting.status === 'Completed'
        },
        {
          label: 'View details',
          icon: 'event',
          callback: () => console.log('View details', meeting)
        },
        {
          label: 'View analytics',
          icon: 'analytics',
          callback: () => console.log('View analytics', meeting)
        },
        {
          label: 'Copy meeting link',
          icon: 'content_copy',
          callback: () => console.log('Copy meeting link', meeting),
          disabled: !meeting.meetingUrl
        },
        {
          dividerBefore: true,
          label: 'Delete',
          icon: 'delete_outline',
          callback: () => console.log('Delete', meeting),
          danger: true
        }
      ]);
    }
    return this.meetingActionsMap.get(meeting)!;
  }

}
