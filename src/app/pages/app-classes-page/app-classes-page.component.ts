import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClassData, ClassStatus, ClassStatusColorMap } from '../../models';
import { ActionMenuItem } from '../../models/action.menu.model';
import { AppActionMenuComponent } from '../../molecules/app-action-menu/app-action-menu.component';
import { AppChipSetComponent } from '../../molecules/app-chip-set/app-chip-set.component';
import { AppPageHeaderCardComponent } from '../../molecules/app-page-header-card/app-page-header-card.component';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [
    MatCardModule, 
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    AppActionMenuComponent,
    AppChipSetComponent,
    AppPageHeaderCardComponent,
    AppButtonComponent
  ],
  template: `
    <div class="page-container">
      <app-page-header-card [title]="'Classes'" [subtitle]="'Manage class schedules and sessions'" [hasActions]="true">
        <div header-actions>
          <app-button label="Schedule Class" color="primary" type="button" variant="flat" icon="add"></app-button>
        </div>
      </app-page-header-card>

      <mat-card class="content-card">
        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="classes" class="classes-table">
              <!-- Class Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef>Class Name</th>
                <td mat-cell *matCellDef="let class">
                  <div class="class-info">
                    <strong>{{class.name}}</strong>
                    <div class="class-subject">{{class.subject}}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Instructor Column -->
              <ng-container matColumnDef="instructor">
                <th mat-header-cell *matHeaderCellDef>Instructor</th>
                <td mat-cell *matCellDef="let class">{{class.instructor}}</td>
              </ng-container>

              <!-- Time Column -->
              <ng-container matColumnDef="time">
                <th mat-header-cell *matHeaderCellDef>Schedule</th>
                <td mat-cell *matCellDef="let class">
                  <div class="schedule-info">
                    <div>{{class.time}}</div>
                    <div class="duration">{{class.duration}} min</div>
                  </div>
                </td>
              </ng-container>

              <!-- Enrollment Column -->
              <ng-container matColumnDef="enrollment">
                <th mat-header-cell *matHeaderCellDef>Enrollment</th>
                <td mat-cell *matCellDef="let class">
                  <div class="enrollment-info">
                    {{class.enrolled}} / {{class.capacity}}
                    <div class="enrollment-bar">
                      <div class="enrollment-fill" 
                           [style.width.%]="(class.enrolled / class.capacity) * 100"></div>
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Room Column -->
              <ng-container matColumnDef="room">
                <th mat-header-cell *matHeaderCellDef>Room</th>
                <td mat-cell *matCellDef="let class">{{class.room}}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Status</th>
                <td mat-cell *matCellDef="let class">
                  <app-chip-set [chipSet]="[{value: class.status}]"></app-chip-set>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let class">
                  <app-action-menu [actions]="getCoursesActions(class)"></app-action-menu>
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
  styleUrl: './app-classes-page.component.scss'
})
export class AppClassesPageComponent {
  displayedColumns: string[] = ['name', 'instructor', 'time', 'enrollment', 'room', 'status', 'actions'];

  classActionsMap = new Map<ClassData, ActionMenuItem[]>();
  
  classes: ClassData[] = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      subject: 'Mathematics',
      instructor: 'Dr. Sarah Johnson',
      time: 'Mon, Wed, Fri 9:00 AM',
      duration: 90,
      capacity: 30,
      enrolled: 28,
      status: ClassStatus.ACTIVE,
      room: 'Room 201'
    },
    {
      id: 2,
      name: 'Introduction to Physics',
      subject: 'Physics',
      instructor: 'Prof. Michael Chen',
      time: 'Tue, Thu 2:00 PM',
      duration: 120,
      capacity: 25,
      enrolled: 22,
      status: ClassStatus.ACTIVE,
      room: 'Lab A'
    },
    {
      id: 3,
      name: 'English Literature',
      subject: 'English',
      instructor: 'Ms. Emily Davis',
      time: 'Mon, Wed 11:00 AM',
      duration: 75,
      capacity: 35,
      enrolled: 31,
      status: ClassStatus.ACTIVE,
      room: 'Room 105'
    },
    {
      id: 4,
      name: 'Computer Science Fundamentals',
      subject: 'Computer Science',
      instructor: 'Dr. James Wilson',
      time: 'Tue, Thu 10:00 AM',
      duration: 100,
      capacity: 20,
      enrolled: 18,
      status: ClassStatus.ACTIVE,
      room: 'Computer Lab'
    },
    {
      id: 5,
      name: 'Biology Lab',
      subject: 'Biology',
      instructor: 'Dr. Lisa Anderson',
      time: 'Fri 1:00 PM',
      duration: 180,
      capacity: 16,
      enrolled: 15,
      status: ClassStatus.UPCOMING,
      room: 'Bio Lab'
    }
  ];

  getStatusColor(status: ClassStatus): 'primary' | 'accent' | 'warn' | undefined {
    return ClassStatusColorMap[status];
  }

  getCoursesActions(classData: ClassData): ActionMenuItem[] {
    if (!this.classActionsMap.has(classData)) {
      console.log('Generating actions for class:', classData.name);
      this.classActionsMap.set(classData, [
        {
          label: 'Edit class',
          icon: 'edit_calendar',
          callback: () => console.log('Edit class', classData)
        },
        {
          label: 'View details',
          icon: 'groups',
          callback: () => console.log('View details', classData)
        },
        {
          label: 'View analytics',
          icon: 'analytics',
          callback: () => console.log('View analytics', classData)
        },
        {
          label: 'Manage Attendance',
          icon: 'how_to_reg',
          callback: () => console.log('Manage Attendance', classData)
        },
        {
          dividerBefore: true,
          label: 'Delete',
          icon: 'delete_outline',
          callback: () => console.log('Delete', classData),
          danger: true
        }
      ]);
    }
    return this.classActionsMap.get(classData)!;
  }

}
