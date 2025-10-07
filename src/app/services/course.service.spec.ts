import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { 
  Course,
  CourseApiResponse,
  CourseFormData,
  CourseStatus,
  CourseCategory 
} from '../models/course.models';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    code: 'TEST101',
    instructor: 'Test Instructor',
    category: CourseCategory.TECHNOLOGY,
    credits: 3,
    enrolled: 25,
    capacity: 50,
    progress: 75,
    status: CourseStatus.ACTIVE,
    duration: '12 weeks',
    startDate: '2024-02-01',
    endDate: '2024-04-01'
  };

  const mockCourseResponse: CourseApiResponse = {
    data: [mockCourse],
    total: 1,
    page: 1,
    pageSize: 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService]
    });
    
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadCourses', () => {
    it('should load courses from JSON file', () => {
      service.loadCourses().subscribe(response => {
        expect(response).toEqual(mockCourseResponse);
        expect(response.data.length).toBe(1);
        expect(response.total).toBe(1);
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCourseResponse);
    });

    it('should handle error and return empty response', () => {
      service.loadCourses().subscribe(response => {
        expect(response.data).toEqual([]);
        expect(response.total).toBe(0);
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.error(new ProgressEvent('Network error'));
    });
  });

  describe('getCourses', () => {
    it('should get courses with pagination', () => {
      service.getCourses(1, 10).subscribe(response => {
        expect(response.page).toBe(1);
        expect(response.pageSize).toBe(10);
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });

    it('should get courses with sorting', () => {
      service.getCourses(1, 10, 'title', 'asc').subscribe(response => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });

    it('should apply default pagination values', () => {
      service.getCourses().subscribe(response => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });
  });

  describe('getCourseById', () => {
    it('should get course by ID', () => {
      service.getCourseById(1).subscribe(course => {
        expect(course).toBeDefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });

    it('should return undefined for non-existent course', () => {
      service.getCourseById(999).subscribe(course => {
        expect(course).toBeUndefined();
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });
  });

  describe('createCourse', () => {
    it('should create a new course', () => {
      const formData: CourseFormData = {
        title: 'New Course',
        code: 'NEW101',
        instructor: 'New Instructor',
        category: CourseCategory.TECHNOLOGY,
        credits: 3,
        capacity: 30,
        duration: '8 weeks',
        startDate: '2024-03-01',
        endDate: '2024-05-01',
        status: CourseStatus.ACTIVE
      };

      service.createCourse(formData).subscribe(course => {
        expect(course.title).toBe(formData.title);
        expect(course.code).toBe(formData.code);
        expect(course.category).toBe(formData.category);
      });
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course', () => {
      const updateData: Partial<CourseFormData> = {
        title: 'Updated Course Title',
        code: 'UPD101'
      };

      service.updateCourse(1, updateData).subscribe(course => {
        expect(course).toBeDefined();
        if (course && updateData.title && updateData.code) {
          expect(course.title).toBe(updateData.title);
          expect(course.code).toBe(updateData.code);
        }
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });

    it('should return null for non-existent course', () => {
      service.updateCourse(999, { title: 'Updated' }).subscribe(course => {
        expect(course).toBeNull();
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course', () => {
      service.deleteCourse(1).subscribe(result => {
        expect(result).toBe(true);
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });

    it('should return false for non-existent course', () => {
      service.deleteCourse(999).subscribe(result => {
        expect(result).toBe(false);
      });

      const req = httpMock.expectOne('/assets/demo-data/courses.json');
      req.flush(mockCourseResponse);
    });
  });

  describe('Observable State', () => {
    it('should provide courses observable', () => {
      service.courses$.subscribe(courses => {
        expect(Array.isArray(courses)).toBe(true);
      });
    });
  });

  describe('Utility Methods', () => {
    it('should check if course has capacity', () => {
      expect(mockCourse.enrolled).toBeLessThan(mockCourse.capacity);
    });

    it('should have valid course data', () => {
      expect(mockCourse.id).toBeDefined();
      expect(mockCourse.title).toBeTruthy();
      expect(mockCourse.instructor).toBeTruthy();
      expect(mockCourse.category).toBeDefined();
    });
  });
});