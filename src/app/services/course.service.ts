import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { 
  Course, 
  CourseApiResponse, 
  CourseFormData, 
  CourseStatus, 
  CourseCategory, 
  CrudAction,
  MaterialColor 
} from '../models/course.models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  private readonly DATA_URL = '/assets/demo-data/courses.json';

  constructor(private http: HttpClient) {}

  // Load courses from JSON file
  loadCourses(): Observable<CourseApiResponse> {
    return this.http.get<CourseApiResponse>(this.DATA_URL).pipe(
      delay(500), // Simulate network delay
      catchError(error => {
        console.error('Error loading courses:', error);
        return of({ data: [], total: 0, page: 1, pageSize: 10 });
      })
    );
  }

  // Get courses with pagination
  getCourses(page: number = 1, pageSize: number = 10, sortBy?: string, sortDirection?: 'asc' | 'desc'): Observable<CourseApiResponse> {
    return this.loadCourses().pipe(
      map(response => {
        let courses = [...response.data];
        
        // Apply sorting if specified
        if (sortBy && sortDirection) {
          courses = this.sortCourses(courses, sortBy, sortDirection);
        }
        
        // Apply pagination
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCourses = courses.slice(startIndex, endIndex);
        
        return {
          data: paginatedCourses,
          total: courses.length,
          page: page,
          pageSize: pageSize
        };
      })
    );
  }

  // Get single course by ID
  getCourseById(id: number): Observable<Course | undefined> {
    return this.loadCourses().pipe(
      map(response => response.data.find(course => course.id === id))
    );
  }

  // Create new course (simulated)
  createCourse(courseData: CourseFormData): Observable<Course> {
    return this.loadCourses().pipe(
      map(response => {
        const newId = Math.max(...response.data.map(c => c.id)) + 1;
        const newCourse: Course = {
          id: newId,
          ...courseData,
          enrolled: 0,
          progress: 0
        };
        
        // In a real app, this would make an API call
        console.log('Creating course:', newCourse);
        return newCourse;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Update course (simulated)
  updateCourse(id: number, courseData: Partial<CourseFormData>): Observable<Course> {
    return this.getCourseById(id).pipe(
      map(course => {
        if (!course) {
          throw new Error(`Course with ID ${id} not found`);
        }
        
        const updatedCourse: Course = {
          ...course,
          ...courseData
        };
        
        // In a real app, this would make an API call
        console.log('Updating course:', updatedCourse);
        return updatedCourse;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Delete course (simulated)
  deleteCourse(id: number): Observable<boolean> {
    return this.getCourseById(id).pipe(
      map(course => {
        if (!course) {
          throw new Error(`Course with ID ${id} not found`);
        }
        
        // In a real app, this would make an API call
        console.log('Deleting course:', course);
        return true;
      }),
      delay(1000) // Simulate network delay
    );
  }

  // Handle CRUD actions
  handleCrudAction(action: CrudAction, course: Course): void {
    switch (action) {
      case CrudAction.VIEW:
        this.viewCourse(course);
        break;
      case CrudAction.UPDATE:
        this.editCourse(course);
        break;
      case CrudAction.MANAGE_CONTENT:
        this.manageContent(course);
        break;
      case CrudAction.VIEW_ANALYTICS:
        this.viewAnalytics(course);
        break;
      case CrudAction.DELETE:
        this.deleteCourse(course.id).subscribe(
          success => console.log('Course deleted successfully')
        );
        break;
      default:
        console.warn('Unknown CRUD action:', action);
    }
  }

  // Utility methods for color mapping
  getStatusColor(status: CourseStatus): MaterialColor | undefined {
    const statusColorMap = new Map<CourseStatus, MaterialColor | undefined>([
      [CourseStatus.ACTIVE, MaterialColor.PRIMARY],
      [CourseStatus.UPCOMING, MaterialColor.ACCENT],
      [CourseStatus.COMPLETED, undefined],
      [CourseStatus.DRAFT, MaterialColor.WARN]
    ]);
    
    return statusColorMap.get(status);
  }

  getCategoryColor(category: CourseCategory): MaterialColor | undefined {
    const categoryColorMap = new Map<CourseCategory, MaterialColor | undefined>([
      [CourseCategory.SCIENCE, MaterialColor.PRIMARY],
      [CourseCategory.MATHEMATICS, MaterialColor.ACCENT],
      [CourseCategory.TECHNOLOGY, MaterialColor.PRIMARY],
      [CourseCategory.LANGUAGE, MaterialColor.ACCENT],
      [CourseCategory.ARTS, MaterialColor.WARN]
    ]);
    
    return categoryColorMap.get(category);
  }

  getProgressColor(progress: number): MaterialColor {
    if (progress >= 80) return MaterialColor.PRIMARY;
    if (progress >= 50) return MaterialColor.ACCENT;
    return MaterialColor.WARN;
  }

  // Private helper methods
  private sortCourses(courses: Course[], sortBy: string, direction: 'asc' | 'desc'): Course[] {
    return courses.sort((a, b) => {
      const aValue = (a as any)[sortBy];
      const bValue = (b as any)[sortBy];
      
      let comparison = 0;
      if (aValue > bValue) {
        comparison = 1;
      } else if (aValue < bValue) {
        comparison = -1;
      }
      
      return direction === 'desc' ? comparison * -1 : comparison;
    });
  }

  private viewCourse(course: Course): void {
    // Navigate to course detail view
    console.log('Viewing course:', course.title);
    // In a real app: this.router.navigate(['/courses', course.id]);
  }

  private editCourse(course: Course): void {
    // Open edit form/modal
    console.log('Editing course:', course.title);
    // In a real app: this.dialog.open(CourseEditComponent, { data: course });
  }

  private manageContent(course: Course): void {
    // Navigate to content management
    console.log('Managing content for:', course.title);
    // In a real app: this.router.navigate(['/courses', course.id, 'content']);
  }

  private viewAnalytics(course: Course): void {
    // Navigate to analytics view
    console.log('Viewing analytics for:', course.title);
    // In a real app: this.router.navigate(['/courses', course.id, 'analytics']);
  }
}