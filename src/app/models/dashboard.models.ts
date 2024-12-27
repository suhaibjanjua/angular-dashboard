// Dashboard and general application models
import { TimeRange } from './widget.models';

// API response wrapper interface
export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
  success: boolean;
  message?: string;
  errors?: string[];
}

// Pagination interface
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchQuery?: string;
}

// Filter parameters interface
export interface FilterParams {
  timeRange?: TimeRange;
  startDate?: string;
  endDate?: string;
  status?: string[];
  category?: string[];
  type?: string[];
}

// Dashboard configuration interface
export interface DashboardConfig {
  title: string;
  widgets: string[];
  layout: 'grid' | 'list' | 'masonry';
  refreshInterval?: number;
  defaultTimeRange: TimeRange;
}

// Navigation menu item interface
export interface SidebarMenuItem {
  label: string;
  icon: string;
  route: string;
  children?: SidebarMenuItem[];
  permissions?: string[];
}

// Theme configuration interface
export interface ThemeConfig {
  name: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  isDark: boolean;
}

// Application settings interface
export interface AppSettings {
  theme: ThemeConfig;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: {
    email: boolean;
    push: boolean;
    sound: boolean;
  };
}

// Error handling interface
export interface AppError {
  code: string;
  message: string;
  details?: string;
  timestamp: Date;
  userId?: string;
  action?: string;
}
