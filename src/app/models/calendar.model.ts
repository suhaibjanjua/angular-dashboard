export interface CalendarEvent {
  id: string;
  title: string;
  start: string | Date;
  end?: string | Date;
  allDay?: boolean;
  editable?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    [key: string]: any;
  };
}

// Calendar API response interfaces
export interface CalendarEventApiResponse {
  data: CalendarEvent[];
  total: number;
  startDate: string;
  endDate: string;
}