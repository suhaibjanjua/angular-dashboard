import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { Document, DocumentType, DocumentStatus } from '../../models';
import { AppSearchBarComponent } from "../../molecules/app-search-bar/app-search-bar.component";

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatDividerModule,
    FormsModule,
    AppSearchBarComponent
],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Documents</h1>
        <p class="page-subtitle">Manage course materials and learning resources</p>
      </div>

      <mat-card class="content-card">
        <mat-card-header>
          <div class="table-header">
            <app-search-bar [label]="'Search documents...'" [placeholder]="'Search by name, type, or owner'" (search)="applyFilter($event)"></app-search-bar>
            
            <div class="action-buttons">
              <button mat-flat-button color="primary" (click)="uploadDocument()">
                <mat-icon>upload</mat-icon>
                Upload Document
              </button>
              <button mat-stroked-button (click)="exportDocuments()">
                <mat-icon>file_download</mat-icon>
                Export List
              </button>
            </div>
          </div>
        </mat-card-header>

        <mat-card-content>
          <div class="table-container">
            <table mat-table [dataSource]="filteredDocuments" matSort class="documents-table">
              
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Document</th>
                <td mat-cell *matCellDef="let doc">
                  <div class="document-info">
                    <mat-icon class="file-icon" [ngClass]="getFileTypeClass(doc.type)">{{getFileIcon(doc.type)}}</mat-icon>
                    <div class="document-details">
                      <div class="document-name">{{doc.name}}</div>
                      <div class="document-meta">{{formatFileSize(doc.size)}} • {{doc.type}}</div>
                    </div>
                  </div>
                </td>
              </ng-container>

              <!-- Owner Column -->
              <ng-container matColumnDef="owner">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Owner</th>
                <td mat-cell *matCellDef="let doc">{{doc.owner}}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let doc">
                  <mat-chip-set>
                    <mat-chip [ngClass]="getStatusClass(doc.status)">{{doc.status}}</mat-chip>
                  </mat-chip-set>
                </td>
              </ng-container>

              <!-- Last Modified Column -->
              <ng-container matColumnDef="lastModified">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Last Modified</th>
                <td mat-cell *matCellDef="let doc">{{formatDate(doc.lastModified)}}</td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let doc">
                  <div class="action-buttons">
                    <button mat-icon-button matTooltip="Download" (click)="downloadDocument(doc)">
                      <mat-icon>file_download</mat-icon>
                    </button>
                    <button mat-icon-button matTooltip="View Details">
                      <mat-icon>description</mat-icon>
                    </button>
                    <button mat-icon-button matTooltip="Edit Document" (click)="editDocument(doc)">
                      <mat-icon>edit_document</mat-icon>
                    </button>
                    <button mat-icon-button matTooltip="Share" (click)="shareDocument(doc)">
                      <mat-icon>ios_share</mat-icon>
                    </button>
                    <button mat-icon-button matTooltip="More Options" [matMenuTriggerFor]="menu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                  </div>
                  <mat-menu #menu="matMenu" class="documents-dropdown">
                    <button mat-menu-item (click)="deleteDocument(doc)" class="danger-item">
                      <mat-icon>delete_outline</mat-icon>
                      <span>Delete</span>
                    </button>
                  </mat-menu>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;" class="table-row"></tr>
            </table>

            <div class="no-data" *ngIf="filteredDocuments.length === 0">
              <mat-icon>description</mat-icon>
              <h3>No documents found</h3>
              <p>Upload your first document to get started.</p>
            </div>
          </div>

          <mat-paginator 
            [pageSizeOptions]="[5, 10, 25, 50]" 
            [pageSize]="10"
            [length]="filteredDocuments.length"
            showFirstLastButtons>
          </mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './app-documents-page.component.scss'
})
export class AppDocumentsPageComponent implements OnInit {
  documents: Document[] = [];
  filteredDocuments: Document[] = [];
  displayedColumns: string[] = ['name', 'owner', 'status', 'lastModified', 'actions'];

  ngOnInit() {
    this.loadDocuments();
  }

  loadDocuments() {
    this.documents = [
      {
        id: 1,
        name: 'Course Syllabus - Mathematics.pdf',
        type: DocumentType.PDF,
        size: 2457600,
        owner: 'Dr. Sarah Johnson',
        lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
        createdAt: new Date('2024-01-15'),
        status: DocumentStatus.PUBLISHED
      },
      {
        id: 2,
        name: 'Assignment Template.docx',
        type: DocumentType.DOCX,
        size: 1024000,
        owner: 'Prof. Michael Brown',
        lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-02-01'),
        status: DocumentStatus.PUBLISHED
      },
      {
        id: 3,
        name: 'Grade Sheet Template.xlsx',
        type: DocumentType.XLSX,
        size: 512000,
        owner: 'Admin User',
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        createdAt: new Date('2024-01-20'),
        status: DocumentStatus.DRAFT
      }
    ];
    this.filteredDocuments = [...this.documents];
  }

  applyFilter(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredDocuments = this.documents.filter(doc => 
      doc.name.toLowerCase().includes(filterValue) ||
      doc.type.toLowerCase().includes(filterValue) ||
      doc.owner.toLowerCase().includes(filterValue)
    );
  }

  uploadDocument() {
    console.log('Upload new document');
  }

  editDocument(doc: Document) {
    console.log('Edit document:', doc);
  }

  downloadDocument(doc: Document) {
    console.log('Download document:', doc);
  }

  shareDocument(doc: Document) {
    console.log('Share document:', doc);
  }

  deleteDocument(doc: Document) {
    console.log('Delete document:', doc);
  }

  exportDocuments() {
    console.log('Export documents list');
  }

  getFileIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'PDF': 'picture_as_pdf',
      'DOC': 'description',
      'XLS': 'table_chart',
      'PPT': 'slideshow',
      'TXT': 'text_snippet'
    };
    return icons[type] || 'insert_drive_file';
  }

  getFileTypeClass(type: string): string {
    return `file-type-${type.toLowerCase()}`;
  }

  getStatusClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'Published': 'status-published',
      'Draft': 'status-draft',
      'Archived': 'status-archived'
    };
    return statusClasses[status] || 'status-default';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }
}
