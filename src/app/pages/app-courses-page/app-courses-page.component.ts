import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CourseService } from '../../services/course.service';
import {
  Course,
  CourseStatus,
  CourseCategory,
  CrudAction,
  MaterialColor
} from '../../models/course.models';
import { ActionMenuItem } from '../../models/action.menu.model';
import { AppActionMenuComponent } from '../../molecules/app-action-menu/app-action-menu.component';
import { AppChipSetComponent } from '../../molecules/app-chip-set/app-chip-set.component';
import { AppPageHeaderCardComponent } from '../../molecules/app-page-header-card/app-page-header-card.component';
import { AppButtonComponent } from '../../atoms/app-button/app-button.component';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatSortModule,
    MatProgressSpinnerModule,
    AppActionMenuComponent,
    NgIf,
    AppChipSetComponent,
    AppPageHeaderCardComponent,
    AppButtonComponent
  ],
  template: `
    <div class="page-container">
      <app-page-header-card [title]="'Courses'" [subtitle]="'Manage course curriculum and content'" [hasActions]="true">
        <div header-actions>
          <app-button label="Create Course" color="primary" type="button" variant="flat" icon="add"></app-button>
        </div>
      </app-page-header-card>

      <mat-card class="content-card">
        <mat-card-content>
          <div class="loading-container" *ngIf="loading">
            <mat-spinner diameter="50"></mat-spinner>
            <p>Loading courses...</p>
          </div>

          <div class="table-container" *ngIf="!loading">
            <table mat-table [dataSource]="courses" class="courses-table" matSort (matSortChange)="onSortChange($event)">
              <!-- Course Title Column -->
              <ng-container matColumnDef="title">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Course</th>
                <td mat-cell *matCellDef="let course">
                  <div class="course-info">
                    <strong>{{course.title}}</strong>
                    <div class="course-code">{{course.code}}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Instructor Column -->
              <ng-container matColumnDef="instructor">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Instructor</th>
                <td mat-cell *matCellDef="let course">{{course.instructor}}</td>
              </ng-container>

              <!-- Category Column -->
              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th>
                <td mat-cell *matCellDef="let course">
                  <app-chip-set [chipSet]="[{value: course.category}]"></app-chip-set>
                </td>
              </ng-container>

              <!-- Credits Column -->
              <ng-container matColumnDef="credits">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Credits</th>
                <td mat-cell *matCellDef="let course">
                  <div class="credits-info">
                    <mat-icon>school</mat-icon>
                    {{course.credits}}
                  </div>
                </td>
              </ng-container>

              <!-- Enrollment Column -->
              <ng-container matColumnDef="enrollment">
                <th mat-header-cell *matHeaderCellDef>Enrollment</th>
                <td mat-cell *matCellDef="let course">
                  <div class="enrollment-info">
                    <div class="enrollment-numbers">{{course.enrolled}} / {{course.capacity}}</div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="getEnrollmentPercentage(course)"
                      class="enrollment-progress">
                    </mat-progress-bar>
                  </div>
                </td>
              </ng-container>

              <!-- Progress Column -->
              <ng-container matColumnDef="progress">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Progress</th>
                <td mat-cell *matCellDef="let course">
                  <div class="progress-info">
                    <span class="progress-text">{{course.progress}}%</span>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="course.progress"
                      [color]="getProgressColor(course.progress)"
                      class="course-progress">
                    </mat-progress-bar>
                  </div>
                </td>
              </ng-container>

              <!-- Duration Column -->
              <ng-container matColumnDef="duration">
                <th mat-header-cell *matHeaderCellDef>Duration</th>
                <td mat-cell *matCellDef="let course">
                  <div class="duration-info">
                    <div>{{course.duration}}</div>
                    <div class="date-range">{{course.startDate}} - {{course.endDate}}</div>
                  </div>
                </td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let course">
                  <app-chip-set [chipSet]="[{value: course.status}]"></app-chip-set>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let course">
                  <app-action-menu [actions]="getCoursesActions(course)"></app-action-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
          
          <mat-paginator 
            #paginator
            [length]="totalCourses"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            [pageIndex]="currentPage - 1"
            (page)="onPageChange($event)"
            showFirstLastButtons>
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './app-courses-page.component.scss'
})
export class AppCoursesPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'instructor', 'category', 'credits', 'enrollment', 'progress', 'duration', 'status', 'actions'];

  courses: Course[] = [];
  loading = true;
  totalCourses = 0;
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 20, 50];
  sortBy = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  courseActionsMap = new Map<Course, ActionMenuItem[]>();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getCourses(this.currentPage, this.pageSize, this.sortBy, this.sortDirection)
      .subscribe({
        next: (response) => {
          this.courses = response.data;
          this.totalCourses = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading courses:', error);
          this.loading = false;
        }
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCourses();
  }

  onSortChange(event: any): void {
    this.sortBy = event.active;
    this.sortDirection = event.direction || 'asc';
    this.currentPage = 1; // Reset to first page when sorting
    this.loadCourses();
  }

  handleAction(action: string, course: Course): void {
    const crudAction = action as CrudAction;
    this.courseService.handleCrudAction(crudAction, course);

    // Reload data if needed (e.g., after delete)
    if (crudAction === CrudAction.DELETE) {
      setTimeout(() => this.loadCourses(), 1500);
    }
  }

  createNewCourse(): void {
    console.log('Creating new course...');
    // In a real app, this would open a form dialog or navigate to create page
    // this.router.navigate(['/courses/create']);
  }

  getCoursesActions(course: Course): ActionMenuItem[] {
    if (!this.courseActionsMap.has(course)) {
      console.log('Generating actions for course:', course.title);
      this.courseActionsMap.set(course, [
        {
          label: 'Edit course',
          icon: 'tune',
          callback: () => this.handleAction('update', course)
        },
        {
          label: 'View details',
          icon: 'school',
          callback: () => this.handleAction('view', course)
        },
        {
          label: 'View analytics',
          icon: 'analytics',
          callback: () => this.handleAction('view_analytics', course)
        },
        {
          label: 'Manage Content',
          icon: 'library_books',
          callback: () => this.handleAction('manage_content', course)
        },
        {
          dividerBefore: true,
          label: 'Delete',
          icon: 'delete_outline',
          callback: () => this.handleAction('delete', course),
          danger: true,
          disabled: course.status !== 'Draft'
        }
      ]);
    }
    return this.courseActionsMap.get(course)!;
  }

  getEnrollmentPercentage(course: Course): number {
    return course.capacity > 0 ? (course.enrolled / course.capacity) * 100 : 0;
  }

  getStatusColor(status: CourseStatus): MaterialColor | undefined {
    return this.courseService.getStatusColor(status);
  }

  getCategoryColor(category: CourseCategory): MaterialColor | undefined {
    return this.courseService.getCategoryColor(category);
  }

  getProgressColor(progress: number): MaterialColor {
    return this.courseService.getProgressColor(progress);
  }
}
