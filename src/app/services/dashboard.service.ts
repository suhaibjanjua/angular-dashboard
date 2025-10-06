import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TimeRange } from '../models/widget.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  exportData(format: 'csv' | 'excel', timeRange: TimeRange | string): Observable<Blob> {
    // Mock implementation for export functionality
    const mockData = new Blob(['Mock export data'], { type: 'text/plain' });
    return of(mockData);
  }
}
