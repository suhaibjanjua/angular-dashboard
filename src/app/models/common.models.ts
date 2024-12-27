// Common UI and system-related enums and constants

// Material Design color options
export enum MaterialColor {
  PRIMARY = 'primary',
  ACCENT = 'accent', 
  WARN = 'warn'
}

// System health and performance status
export enum SystemStatus {
  GOOD = 'good',
  WARNING = 'warning', 
  CRITICAL = 'critical',
  ERROR = 'error'
}

// Activity and event types
export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  COURSE_ACCESS = 'course_access',
  SYSTEM_EVENT = 'system_event',
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info'
}

// Difficulty levels for courses/content
export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate', 
  ADVANCED = 'Advanced'
}

// File export formats
export enum ExportFormat {
  CSV = 'csv',
  EXCEL = 'excel',
  PDF = 'PDF',
  XLSX = 'xlsx'
}

// File types for documents
export enum DocumentType {
  PDF = 'PDF',
  DOC = 'DOC', 
  XLS = 'XLS',
  PPT = 'PPT',
  TXT = 'TXT',
  DOCX = 'DOCX',
  XLSX = 'XLSX',
  PPTX = 'PPTX'
}

// General status values used across components
export enum GeneralStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived',
  SCHEDULED = 'Scheduled',
  IN_PROGRESS = 'In Progress',
  FAILED = 'Failed',
  PROCESSING = 'Processing',
  GENERATED = 'Generated',
  UPCOMING = 'Upcoming'
}

// Report categories and types
export enum ReportCategory {
  STUDENT = 'Student',
  COURSE = 'Course', 
  FACULTY = 'Faculty',
  SYSTEM = 'System'
}

export enum ReportType {
  ACADEMIC = 'Academic',
  ATTENDANCE = 'Attendance',
  PERFORMANCE = 'Performance',
  ANALYTICS = 'Analytics'
}

// Meeting types
export enum MeetingType {
  LECTURE = 'Lecture',
  SEMINAR = 'Seminar',
  WORKSHOP = 'Workshop',
  TUTORIAL = 'Tutorial',
  OFFICE_HOURS = 'Office Hours',
  EXAM = 'Exam',
  CONFERENCE = 'Conference'
}

// Icon mappings for various statuses
export const StatusIconMap = {
  [GeneralStatus.ACTIVE]: 'check_circle',
  [GeneralStatus.INACTIVE]: 'cancel', 
  [GeneralStatus.PENDING]: 'schedule',
  [GeneralStatus.COMPLETED]: 'check_circle',
  [GeneralStatus.CANCELLED]: 'cancel',
  [GeneralStatus.DRAFT]: 'edit',
  [GeneralStatus.PUBLISHED]: 'publish',
  [GeneralStatus.ARCHIVED]: 'archive',
  [GeneralStatus.SCHEDULED]: 'event',
  [GeneralStatus.IN_PROGRESS]: 'play_circle',
  [GeneralStatus.FAILED]: 'error',
  [GeneralStatus.PROCESSING]: 'sync',
  [GeneralStatus.GENERATED]: 'check_circle',
  [GeneralStatus.UPCOMING]: 'schedule'
} as const;

// Color mappings for various statuses
export const StatusColorMap = {
  [GeneralStatus.ACTIVE]: MaterialColor.PRIMARY,
  [GeneralStatus.INACTIVE]: MaterialColor.WARN,
  [GeneralStatus.PENDING]: MaterialColor.ACCENT,
  [GeneralStatus.COMPLETED]: MaterialColor.PRIMARY,
  [GeneralStatus.CANCELLED]: MaterialColor.WARN,
  [GeneralStatus.DRAFT]: MaterialColor.ACCENT,
  [GeneralStatus.PUBLISHED]: MaterialColor.PRIMARY,
  [GeneralStatus.ARCHIVED]: MaterialColor.WARN,
  [GeneralStatus.SCHEDULED]: MaterialColor.ACCENT,
  [GeneralStatus.IN_PROGRESS]: MaterialColor.ACCENT,
  [GeneralStatus.FAILED]: MaterialColor.WARN,
  [GeneralStatus.PROCESSING]: MaterialColor.ACCENT,
  [GeneralStatus.GENERATED]: MaterialColor.PRIMARY,
  [GeneralStatus.UPCOMING]: MaterialColor.ACCENT
} as const;

// CSS class mappings for status styling
export const StatusCssClassMap = {
  [GeneralStatus.ACTIVE]: 'status-active',
  [GeneralStatus.INACTIVE]: 'status-inactive',
  [GeneralStatus.PENDING]: 'status-pending',
  [GeneralStatus.COMPLETED]: 'status-completed',
  [GeneralStatus.CANCELLED]: 'status-cancelled',
  [GeneralStatus.DRAFT]: 'status-draft',
  [GeneralStatus.PUBLISHED]: 'status-published',
  [GeneralStatus.ARCHIVED]: 'status-archived',
  [GeneralStatus.SCHEDULED]: 'status-scheduled',
  [GeneralStatus.IN_PROGRESS]: 'status-in-progress',
  [GeneralStatus.FAILED]: 'status-failed',
  [GeneralStatus.PROCESSING]: 'status-processing',
  [GeneralStatus.GENERATED]: 'status-generated',
  [GeneralStatus.UPCOMING]: 'status-upcoming'
} as const;

// Document type icon mappings
export const DocumentTypeIconMap = {
  [DocumentType.PDF]: 'picture_as_pdf',
  [DocumentType.DOC]: 'description',
  [DocumentType.DOCX]: 'description', 
  [DocumentType.XLS]: 'table_chart',
  [DocumentType.XLSX]: 'table_chart',
  [DocumentType.PPT]: 'slideshow',
  [DocumentType.PPTX]: 'slideshow',
  [DocumentType.TXT]: 'description'
} as const;

// Report format icon mappings
export const ReportFormatIconMap = {
  [ExportFormat.PDF]: 'picture_as_pdf',
  [ExportFormat.EXCEL]: 'table_chart',
  [ExportFormat.CSV]: 'description',
  [ExportFormat.XLSX]: 'table_chart',
  PowerBI: 'analytics'  // Special case for PowerBI
} as const;