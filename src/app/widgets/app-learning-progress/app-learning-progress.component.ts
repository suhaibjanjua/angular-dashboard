import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  timeSpent: number; // in minutes
  lastAccessed: Date;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
}

interface LearningStats {
  totalCourses: number;
  completedCourses: number;
  avgProgress: number;
  totalTimeSpent: number; // in minutes
  streakDays: number;
  certificatesEarned: number;
}

@Component({
  selector: 'app-learning-progress',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatProgressBarModule, CommonModule],
  template: `
    <mat-card class="learning-progress-card">
      <mat-card-header>
        <mat-card-title>
          Learning Progress
          <span class="progress-badge">{{ stats.avgProgress.toFixed(0) }}% Avg</span>
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <!-- Learning Stats Overview -->
        <div class="stats-overview">
          <div class="stat-item">
            <mat-icon>school</mat-icon>
            <div class="stat-content">
              <span class="stat-value">{{ stats.totalCourses }}</span>
              <span class="stat-label">Active Courses</span>
            </div>
          </div>
          
          <div class="stat-item">
            <mat-icon>emoji_events</mat-icon>
            <div class="stat-content">
              <span class="stat-value">{{ stats.completedCourses }}</span>
              <span class="stat-label">Completed</span>
            </div>
          </div>
          
          <div class="stat-item">
            <mat-icon>schedule</mat-icon>
            <div class="stat-content">
              <span class="stat-value">{{ formatTime(stats.totalTimeSpent) }}</span>
              <span class="stat-label">Time Spent</span>
            </div>
          </div>
          
          <div class="stat-item">
            <mat-icon>local_fire_department</mat-icon>
            <div class="stat-content">
              <span class="stat-value">{{ stats.streakDays }}</span>
              <span class="stat-label">Day Streak</span>
            </div>
          </div>
        </div>
        
        <!-- Course Progress List -->
        <div class="course-progress-list">
          <h3>Current Courses</h3>
          <div *ngFor="let course of courses" class="course-item">
            <div class="course-header">
              <div class="course-info">
                <h4 class="course-name">{{ course.courseName }}</h4>
                <div class="course-meta">
                  <span class="instructor">by {{ course.instructor }}</span>
                  <span class="difficulty" [ngClass]="course.difficulty.toLowerCase()">{{ course.difficulty }}</span>
                </div>
              </div>
              <div class="course-stats">
                <span class="progress-text">{{ course.completedLessons }}/{{ course.totalLessons }} lessons</span>
                <span class="time-spent">{{ formatTime(course.timeSpent) }}</span>
              </div>
            </div>
            
            <div class="progress-section">
              <mat-progress-bar 
                mode="determinate" 
                [value]="course.progress"
                [ngClass]="getProgressClass(course.progress)">
              </mat-progress-bar>
              <div class="progress-labels">
                <span class="progress-percent">{{ course.progress.toFixed(0) }}%</span>
                <span class="last-accessed">Last: {{ formatLastAccessed(course.lastAccessed) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Achievement Summary -->
        <div class="achievement-summary">
          <div class="achievement-item">
            <mat-icon class="achievement-icon">workspace_premium</mat-icon>
            <span class="achievement-text">{{ stats.certificatesEarned }} certificates earned</span>
          </div>
          
          <div class="achievement-item">
            <mat-icon class="achievement-icon">trending_up</mat-icon>
            <span class="achievement-text">{{ getTopPerformingCourse() }} is your top course</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './app-learning-progress.component.scss'
})
export class AppLearningProgressComponent implements OnInit {
  courses: CourseProgress[] = [];
  stats: LearningStats = {
    totalCourses: 0,
    completedCourses: 0,
    avgProgress: 0,
    totalTimeSpent: 0,
    streakDays: 0,
    certificatesEarned: 0
  };

  ngOnInit() {
    this.loadLearningData();
    this.calculateStats();
  }

  private loadLearningData() {
    this.courses = [
      {
        courseId: '1',
        courseName: 'Advanced Mathematics',
        progress: 78,
        totalLessons: 25,
        completedLessons: 19,
        timeSpent: 450,
        lastAccessed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        difficulty: 'Advanced',
        instructor: 'Dr. Sarah Johnson'
      },
      {
        courseId: '2',
        courseName: 'Web Development Fundamentals',
        progress: 92,
        totalLessons: 30,
        completedLessons: 28,
        timeSpent: 680,
        lastAccessed: new Date(Date.now() - 4 * 60 * 60 * 1000),
        difficulty: 'Intermediate',
        instructor: 'Mark Thompson'
      },
      {
        courseId: '3',
        courseName: 'Data Science Basics',
        progress: 45,
        totalLessons: 20,
        completedLessons: 9,
        timeSpent: 290,
        lastAccessed: new Date(Date.now() - 24 * 60 * 60 * 1000),
        difficulty: 'Beginner',
        instructor: 'Dr. Emily Chen'
      },
      {
        courseId: '4',
        courseName: 'Machine Learning',
        progress: 23,
        totalLessons: 35,
        completedLessons: 8,
        timeSpent: 180,
        lastAccessed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        difficulty: 'Advanced',
        instructor: 'Prof. Michael Brown'
      },
      {
        courseId: '5',
        courseName: 'Digital Marketing',
        progress: 100,
        totalLessons: 15,
        completedLessons: 15,
        timeSpent: 320,
        lastAccessed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        difficulty: 'Intermediate',
        instructor: 'Lisa Anderson'
      }
    ];
  }

  private calculateStats() {
    this.stats.totalCourses = this.courses.length;
    this.stats.completedCourses = this.courses.filter(c => c.progress === 100).length;
    this.stats.avgProgress = this.courses.reduce((sum, c) => sum + c.progress, 0) / this.courses.length;
    this.stats.totalTimeSpent = this.courses.reduce((sum, c) => sum + c.timeSpent, 0);
    this.stats.streakDays = 12; // Mock data
    this.stats.certificatesEarned = this.stats.completedCourses;
  }

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) return `${mins}m`;
    return `${hours}h ${mins}m`;
  }

  formatLastAccessed(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  getProgressClass(progress: number): string {
    if (progress >= 80) return 'high-progress';
    if (progress >= 50) return 'medium-progress';
    return 'low-progress';
  }

  getTopPerformingCourse(): string {
    const topCourse = this.courses.reduce((prev, curr) => 
      prev.progress > curr.progress ? prev : curr
    );
    return topCourse.courseName;
  }
}
