// Barrel exports for all model interfaces and enums
export * from './common.models';   // All shared enums and constants
export * from './user.models';     // User, UserStatus, UserRole, UserStatusColorMap, UserRoleColorMap
export * from './course.models';   // Course, CourseStatus, CourseDifficulty, CourseStatusColorMap, CourseDifficultyColorMap  
export * from './report.models';   // Report, ReportStatus, ReportStatusColorMap, ReportTypeColorMap, ReportCategoryColorMap
export * from './class.models';    // ClassStatus, ClassStatusColorMap, ClassData
export * from './document.models'; // DocumentStatus, DocumentStatusColorMap, Document
export * from './meeting.models';  // MeetingStatus, MeetingType, MeetingStatusColorMap, MeetingData
export * from './widget.models';   // TimeRange, WidgetType, PerformanceMetric, ActivityItem
export * from './dashboard.models'; // ApiResponse, PaginationParams, FilterParams, DashboardConfig, etc.