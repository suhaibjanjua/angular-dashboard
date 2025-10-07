import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { UserService } from './user.service';
import { TimeRange } from '../models/widget.models';

describe('DashboardService', () => {
  let service: DashboardService;

  const mockUserService = {
    getUser: jasmine.createSpy('getUser').and.returnValue(of(null)),
    getUsers: jasmine.createSpy('getUsers').and.returnValue(of([])),
    createUser: jasmine.createSpy('createUser').and.returnValue(of(null)),
    updateUser: jasmine.createSpy('updateUser').and.returnValue(of(null)),
    deleteUser: jasmine.createSpy('deleteUser').and.returnValue(of(false))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DashboardService,
        { provide: UserService, useValue: mockUserService }
      ]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportData', () => {
    it('should export data in CSV format with TimeRange enum', () => {
      service.exportData('csv', TimeRange.LAST_30_DAYS).subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain');
        expect(blob.size).toBeGreaterThan(0);
      });
    });

    it('should export data in Excel format with string timeRange', () => {
      service.exportData('excel', 'last-month').subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('text/plain');
        expect(blob.size).toBeGreaterThan(0);
      });
    });

    it('should handle CSV export with different TimeRange values', () => {
      service.exportData('csv', TimeRange.TODAY).subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
      });

      service.exportData('csv', TimeRange.THIS_MONTH).subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
      });
    });

    it('should handle Excel export with string time range', () => {
      service.exportData('excel', 'this-year').subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
      });
    });

    it('should return non-empty blob for both formats', () => {
      service.exportData('csv', TimeRange.TODAY).subscribe(blob => {
        expect(blob.size).toBeGreaterThan(0);
      });

      service.exportData('excel', 'this-week').subscribe(blob => {
        expect(blob.size).toBeGreaterThan(0);
      });
    });

    it('should handle custom time range string', () => {
      service.exportData('csv', TimeRange.CUSTOM).subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.size).toBeGreaterThan(0);
      });
    });
  });
});