// Notification system models and enums
import { SystemStatus } from './common.models';

// Notification priority levels
export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// Notification types
export enum NotificationType {
  SYSTEM = 'system',
  USER = 'user',
  COURSE = 'course',
  ASSIGNMENT = 'assignment',
  MESSAGE = 'message',
  MEETING = 'meeting',
  SECURITY = 'security',
  UPDATE = 'update',
  REMINDER = 'reminder',
  ANNOUNCEMENT = 'announcement'
}

// Notification status
export enum NotificationStatus {
  UNREAD = 'unread',
  READ = 'read',
  ARCHIVED = 'archived'
}

// Main notification interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  timestamp: Date;
  createdAt: Date;
  readAt?: Date;
  archivedAt?: Date;
  icon: string;
  iconColor: string;
  actionUrl?: string;
  actionLabel?: string;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  metadata?: NotificationMetadata;
}

// Notification metadata for additional context
export interface NotificationMetadata {
  courseId?: string;
  courseName?: string;
  assignmentId?: string;
  assignmentName?: string;
  meetingId?: string;
  meetingName?: string;
  documentId?: string;
  documentName?: string;
  reportId?: string;
  reportName?: string;
  [key: string]: any;
}

// Notification filter options
export interface NotificationFilter {
  types?: NotificationType[];
  priorities?: NotificationPriority[];
  status?: NotificationStatus[];
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  searchQuery?: string;
}

// Notification settings interface
export interface NotificationSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  soundEnabled: boolean;
  desktopNotifications: boolean;
  notificationTypes: {
    [key in NotificationType]: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily';
}

// Notification summary for dashboard
export interface NotificationSummary {
  total: number;
  unread: number;
  byType: {
    [key in NotificationType]: number;
  };
  byPriority: {
    [key in NotificationPriority]: number;
  };
  recentNotifications: Notification[];
}

// API response interfaces
export interface NotificationApiResponse {
  data: Notification[];
  total: number;
  unread: number;
  page?: number;
  pageSize?: number;
  hasMore?: boolean;
}

// Notification labels for UI display
export const NotificationTypeLabels = {
  [NotificationType.SYSTEM]: 'System',
  [NotificationType.USER]: 'User',
  [NotificationType.COURSE]: 'Course',
  [NotificationType.ASSIGNMENT]: 'Assignment',
  [NotificationType.MESSAGE]: 'Message',
  [NotificationType.MEETING]: 'Meeting',
  [NotificationType.SECURITY]: 'Security',
  [NotificationType.UPDATE]: 'Update',
  [NotificationType.REMINDER]: 'Reminder',
  [NotificationType.ANNOUNCEMENT]: 'Announcement'
} as const;

export const NotificationPriorityLabels = {
  [NotificationPriority.LOW]: 'Low',
  [NotificationPriority.MEDIUM]: 'Medium',
  [NotificationPriority.HIGH]: 'High',
  [NotificationPriority.URGENT]: 'Urgent'
} as const;

export const NotificationPriorityColors = {
  [NotificationPriority.LOW]: '#4caf50',
  [NotificationPriority.MEDIUM]: '#ff9800',
  [NotificationPriority.HIGH]: '#f44336',
  [NotificationPriority.URGENT]: '#e91e63'
} as const;
