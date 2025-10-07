import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalendarService } from './calendar.service';
import { CalendarEventApiResponse } from '../models/calendar.model';

describe('CalendarService', () => {
  let service: CalendarService;
  let httpMock: HttpTestingController;

  const mockCalendarResponse: CalendarEventApiResponse = {
    data: [
      {
        id: '1',
        title: 'Test Event',
        start: '2024-01-15T10:00:00',
        end: '2024-01-15T11:00:00',
        backgroundColor: '#007bff',
        extendedProps: {
          description: 'Test description'
        }
      }
    ],
    total: 1,
    startDate: '2024-01-01',
    endDate: '2024-01-31'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CalendarService]
    });
    
    service = TestBed.inject(CalendarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadCalendarEvents', () => {
    it('should load calendar events from JSON file', () => {
      service.loadCalendarEvents().subscribe(response => {
        expect(response).toEqual(mockCalendarResponse);
        expect(response.data.length).toBe(1);
        expect(response.total).toBe(1);
      });

      const req = httpMock.expectOne('/assets/demo-data/calendar-events.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCalendarResponse);
    });

    it('should handle error and return empty response', () => {
      service.loadCalendarEvents().subscribe(response => {
        expect(response.data).toEqual([]);
        expect(response.total).toBe(0);
        expect(response.startDate).toBe('');
        expect(response.endDate).toBe('');
      });

      const req = httpMock.expectOne('/assets/demo-data/calendar-events.json');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getCalendarOptions', () => {
    it('should return calendar options with plugins', () => {
      const options = service.getCalendarOptions();
      
      expect(options.plugins).toBeDefined();
      expect(options.plugins?.length).toBeGreaterThan(0);
      expect(options.initialView).toBe('dayGridMonth');
    });

    it('should configure header toolbar', () => {
      const options = service.getCalendarOptions();
      
      expect(options.headerToolbar).toBeDefined();
      if (options.headerToolbar && typeof options.headerToolbar === 'object') {
        expect(options.headerToolbar.left).toContain('dayGridMonth');
        expect(options.headerToolbar.left).toContain('timeGridWeek');
        expect(options.headerToolbar.center).toBe('title');
        expect(options.headerToolbar.right).toContain('prev,next');
      }
    });

    it('should be selectable and editable', () => {
      const options = service.getCalendarOptions();
      
      expect(options.selectable).toBe(true);
      expect(options.editable).toBe(true);
    });

    it('should have event interaction callbacks', () => {
      const options = service.getCalendarOptions();
      
      expect(options.eventClick).toBeDefined();
      expect(options.select).toBeDefined();
      expect(options.eventDrop).toBeDefined();
      expect(options.eventResize).toBeDefined();
    });

    it('should handle locale configuration', () => {
      const options = service.getCalendarOptions();
      
      expect(options.locale).toBeDefined();
    });

    it('should configure event display settings', () => {
      const options = service.getCalendarOptions();
      
      expect(options.dayMaxEvents).toBe(3);
      expect(options.moreLinkClick).toBe('popover');
      expect(options.eventDisplay).toBe('block');
    });

    it('should configure business hours', () => {
      const options = service.getCalendarOptions();
      
      expect(options.businessHours).toBeDefined();
      if (Array.isArray(options.businessHours)) {
        expect(options.businessHours.length).toBeGreaterThan(0);
      }
    });

    it('should handle weekend visibility', () => {
      const options = service.getCalendarOptions();
      
      expect(options.weekends).toBe(true);
    });

    it('should configure view-specific settings', () => {
      const options = service.getCalendarOptions();
      
      expect(options.views).toBeDefined();
      expect(options.aspectRatio).toBeGreaterThan(0);
    });

    it('should handle responsive design', () => {
      const options = service.getCalendarOptions();
      
      expect(options.height).toBeDefined();
      expect(options.handleWindowResize).toBe(true);
    });
  });

  describe('Calendar Event Handlers', () => {
    let options: any;

    beforeEach(() => {
      options = service.getCalendarOptions();
    });

    it('should handle event click', () => {
      const mockEventClickArg = {
        event: {
          id: '1',
          title: 'Test Event',
          start: new Date(),
          end: new Date()
        },
        el: document.createElement('div'),
        jsEvent: new MouseEvent('click'),
        view: {} as any
      };

      spyOn(console, 'log');
      options.eventClick(mockEventClickArg);
      
      expect(console.log).toHaveBeenCalledWith('Event clicked:', mockEventClickArg.event);
    });

    it('should handle date selection', () => {
      const mockSelectArg = {
        start: new Date(),
        end: new Date(),
        allDay: false,
        view: {} as any,
        jsEvent: new MouseEvent('click')
      };

      spyOn(console, 'log');
      options.select(mockSelectArg);
      
      expect(console.log).toHaveBeenCalledWith('Date selected:', mockSelectArg);
    });

    it('should handle event drop', () => {
      const mockDropArg = {
        event: {
          id: '1',
          title: 'Test Event',
          start: new Date(),
          end: new Date()
        },
        oldEvent: {
          id: '1',
          title: 'Test Event',
          start: new Date(),
          end: new Date()
        },
        delta: {} as any,
        revert: jasmine.createSpy('revert'),
        view: {} as any
      };

      spyOn(console, 'log');
      options.eventDrop(mockDropArg);
      
      expect(console.log).toHaveBeenCalledWith('Event dropped:', mockDropArg.event);
    });

    it('should handle event resize', () => {
      const mockResizeArg = {
        event: {
          id: '1',
          title: 'Test Event',
          start: new Date(),
          end: new Date()
        },
        oldEvent: {
          id: '1',
          title: 'Test Event',
          start: new Date(),
          end: new Date()
        },
        endDelta: {} as any,
        revert: jasmine.createSpy('revert'),
        view: {} as any
      };

      spyOn(console, 'log');
      options.eventResize(mockResizeArg);
      
      expect(console.log).toHaveBeenCalledWith('Event resized:', mockResizeArg.event);
    });
  });

  describe('Service Robustness and Performance', () => {
    it('should handle multiple concurrent requests gracefully', () => {
      // Start multiple requests simultaneously
      const request1 = service.loadCalendarEvents();
      const request2 = service.loadCalendarEvents();
      const request3 = service.loadCalendarEvents();

      // All should be handled independently
      request1.subscribe(response => {
        expect(response).toBeDefined();
      });

      request2.subscribe(response => {
        expect(response).toBeDefined();
      });

      request3.subscribe(response => {
        expect(response).toBeDefined();
      });

      // Fulfill all requests
      const requests = httpMock.match('/assets/demo-data/calendar-events.json');
      expect(requests.length).toBe(3);
      
      requests.forEach(req => {
        req.flush(mockCalendarResponse);
      });
    });

    it('should maintain calendar options consistency', () => {
      const options1 = service.getCalendarOptions();
      const options2 = service.getCalendarOptions();
      
      // Options should be consistent between calls
      expect(options1.initialView).toBe(options2.initialView);
      expect(options1.selectable).toBe(options2.selectable);
      expect(options1.editable).toBe(options2.editable);
    });

    it('should handle large event datasets efficiently', () => {
      const largeDataset = {
        data: Array.from({ length: 1000 }, (_, i) => ({
          id: i.toString(),
          title: `Event ${i}`,
          start: `2024-01-${String(i % 28 + 1).padStart(2, '0')}T10:00:00`,
          end: `2024-01-${String(i % 28 + 1).padStart(2, '0')}T11:00:00`,
          backgroundColor: '#007bff'
        })),
        total: 1000,
        startDate: '2024-01-01',
        endDate: '2024-01-31'
      };

      service.loadCalendarEvents().subscribe(response => {
        expect(response.data.length).toBe(1000);
        expect(response.total).toBe(1000);
      });

      const req = httpMock.expectOne('/assets/demo-data/calendar-events.json');
      req.flush(largeDataset);
    });
  });
});