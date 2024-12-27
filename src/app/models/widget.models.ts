// Widget and dashboard-related models and enums
import { SystemStatus, ActivityType, DifficultyLevel } from './common.models';

// Performance metric interface
export interface PerformanceMetric {
  name: string;
  value: string;
  percentage: number;
  status: SystemStatus;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
}

// System health metric interface
export interface SystemHealthMetric {
  name: string;
  value: string;
  percentage: number;
  status: SystemStatus;
  icon: string;
}

// Activity item interface
export interface ActivityItem {
  id: number;
  time: string;
  user: string;
  action: string;
  message: string;
  type: ActivityType;
  timestamp: Date;
}

// Real-time activity interface
export interface RealTimeActivity {
  time: string;
  text: string;
  icon: string;
  type: ActivityType;
}

// Learning progress course interface
export interface LearningProgressCourse {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  category: string;
}

// Quick stats card interface
export interface QuickStatsCard {
  icon: string;
  value: string | number;
  label: string;
  change: string;
  changeIcon: string;
  changeClass: string;
  iconClass: string;
}

// Time range options for filters
export enum TimeRange {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  LAST_90_DAYS = 'last_90_days',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  THIS_YEAR = 'this_year',
  CUSTOM = 'custom'
}

// Time range display labels
export const TimeRangeLabels = {
  [TimeRange.TODAY]: 'Today',
  [TimeRange.YESTERDAY]: 'Yesterday',
  [TimeRange.LAST_7_DAYS]: 'Last 7 Days',
  [TimeRange.LAST_30_DAYS]: 'Last 30 Days', 
  [TimeRange.LAST_90_DAYS]: 'Last 90 Days',
  [TimeRange.THIS_MONTH]: 'This Month',
  [TimeRange.LAST_MONTH]: 'Last Month',
  [TimeRange.THIS_YEAR]: 'This Year',
  [TimeRange.CUSTOM]: 'Custom Range'
} as const;