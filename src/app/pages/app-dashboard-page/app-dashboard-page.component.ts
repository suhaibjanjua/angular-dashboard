import { Component } from '@angular/core';
import { AppRealTimeActivityComponent } from '../../widgets/app-real-time-activity/app-real-time-activity.component';
import { AppRecentActivitiesComponent } from '../../widgets/app-recent-activities/app-recent-activities.component';
import { AppPerformanceMetricsComponent } from '../../widgets/app-performance-metrics/app-performance-metrics.component';
import { AppAttendanceTrendsComponent } from '../../widgets/app-attendance-trends/app-attendance-trends.component';
import { AppAverageSessionDurationComponent } from '../../widgets/app-average-session-duration/app-average-session-duration.component';
import { AppUserOverviewCardComponent } from '../../widgets/app-user-overview-card/app-user-overview-card.component';
import { AppSessionDistributionWidgetComponent } from '../../widgets/app-session-distribution-widget/app-session-distribution-widget.component';
import { AppQuickStatsCardsComponent } from '../../widgets/app-quick-stats-cards/app-quick-stats-cards.component';
import { AppPeakUsageTimesComponent } from '../../widgets/app-peak-usage-times/app-peak-usage-times.component';
import { AppSystemHealthWidgetComponent } from '../../widgets/app-system-health-widget/app-system-health-widget.component';
import { AppTopActiveClassesWidgetComponent } from '../../widgets/app-top-active-classes-widget/app-top-active-classes-widget.component';
import { AppUserEngagementMetricsComponent } from '../../widgets/app-user-engagement-metrics/app-user-engagement-metrics.component';
import { AppDeviceAnalyticsComponent } from '../../widgets/app-device-analytics/app-device-analytics.component';
import { AppGeographicDistributionComponent } from '../../widgets/app-geographic-distribution/app-geographic-distribution.component';
import { AppLearningProgressComponent } from '../../widgets/app-learning-progress/app-learning-progress.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    AppRealTimeActivityComponent,
    AppRecentActivitiesComponent,
    AppPerformanceMetricsComponent,
    AppAttendanceTrendsComponent,
    AppAverageSessionDurationComponent,
    AppUserOverviewCardComponent,
    AppSessionDistributionWidgetComponent,
    AppQuickStatsCardsComponent,
    AppPeakUsageTimesComponent,
    AppSystemHealthWidgetComponent,
    AppTopActiveClassesWidgetComponent,
    AppUserEngagementMetricsComponent,
    AppDeviceAnalyticsComponent,
    AppGeographicDistributionComponent,
    AppLearningProgressComponent
  ],
  template: `
    <div class="dashboard-page">
      <div class="dashboard-header">
        <h1>Analytics Dashboard</h1>
        <p class="dashboard-subtitle">Comprehensive insights into your classroom management system</p>
      </div>
      
      <div class="dashboard-grid">
        <!-- Row 1: Key Metrics -->
        <div class="widget-container large">
          <app-quick-stats-cards></app-quick-stats-cards>
        </div>
        <div class="widget-container">
          <app-system-health-widget></app-system-health-widget>
        </div>
        
        <!-- Row 2: User Analytics -->
        <div class="widget-container">
          <app-user-overview-card></app-user-overview-card>
        </div>
        <div class="widget-container">
          <app-attendance-trends></app-attendance-trends>
        </div>
        <div class="widget-container">
          <app-average-session-duration></app-average-session-duration>
        </div>
        
        <!-- Row 3: Session Analytics -->
        <div class="widget-container">
          <app-session-distribution-widget></app-session-distribution-widget>
        </div>
        <div class="widget-container">
          <app-peak-usage-times></app-peak-usage-times>
        </div>
        <div class="widget-container">
          <app-attendance-trends></app-attendance-trends>
        </div>
        
        <!-- Row 4: Advanced Analytics -->
        <div class="widget-container">
          <app-user-engagement-metrics></app-user-engagement-metrics>
        </div>
        <div class="widget-container">
          <app-device-analytics></app-device-analytics>
        </div>
        <div class="widget-container">
          <app-geographic-distribution></app-geographic-distribution>
        </div>
        
        <!-- Row 5: Top Lists -->
        <div class="widget-container large">
          <app-top-active-classes-widget></app-top-active-classes-widget>
        </div>
        
        <!-- Row 6: Real-time Data -->
        <div class="widget-container large">
          <app-real-time-activity></app-real-time-activity>
        </div>
        
        <div class="widget-container large">
          <app-recent-activities></app-recent-activities>
        </div>
        
        <!-- Row 7: Performance Metrics -->
        <div class="widget-container extra-large">
          <app-performance-metrics></app-performance-metrics>
        </div>
        
        <!-- Row 8: Learning Progress -->
        <div class="widget-container extra-large">
          <app-learning-progress></app-learning-progress>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app-dashboard-page.component.scss']
})
export class AppDashboardPageComponent {}