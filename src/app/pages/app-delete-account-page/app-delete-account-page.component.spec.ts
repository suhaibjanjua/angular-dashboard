import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AppDeleteAccountPageComponent, AppDeleteAccountConfirmationDialogComponent } from './app-delete-account-page.component';

describe('AppDeleteAccountPageComponent', () => {
  let component: AppDeleteAccountPageComponent;
  let fixture: ComponentFixture<AppDeleteAccountPageComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: jasmine.SpyObj<any>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of('confirmed'));

    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(mockDialogRef);

    await TestBed.configureTestingModule({
      imports: [AppDeleteAccountPageComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppDeleteAccountPageComponent);
    component = fixture.componentInstance;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Delete Account');
  });

  it('should display page subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.page-subtitle')?.textContent)
      .toContain('Permanently remove your account and all associated data');
  });

  it('should display warning message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Account deletion is permanent and cannot be undone');
  });

  it('should display data impact information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('What will be deleted:');
    expect(compiled.textContent).toContain('Profile Data');
    expect(compiled.textContent).toContain('Documents');
    expect(compiled.textContent).toContain('Analytics Data');
  });

  it('should display deletion timeline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Deletion Process:');
    expect(compiled.textContent).toContain('Immediate account deactivation');
    expect(compiled.textContent).toContain('7-day grace period for recovery');
    expect(compiled.textContent).toContain('Permanent data deletion after 7 days');
  });

  it('should have delete account button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteButton = compiled.querySelector('button[color="warn"]');
    expect(deleteButton?.textContent).toContain('Delete My Account');
  });

  it('should have go back button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector('button[color="accent"]');
    expect(backButton?.textContent).toContain('Go Back to Settings');
  });

  it('should open delete confirmation dialog', () => {
    component.openDeleteConfirmation();
    
    expect(mockDialog.open).toHaveBeenCalledWith(
      AppDeleteAccountConfirmationDialogComponent,
      {
        width: '500px',
        disableClose: true
      }
    );
  });

  it('should process account deletion when confirmed', () => {
    spyOn(component as any, 'processAccountDeletion');
    
    component.openDeleteConfirmation();
    
    expect(mockDialogRef.afterClosed).toHaveBeenCalled();
    expect((component as any).processAccountDeletion).toHaveBeenCalled();
  });

  it('should not process deletion when dialog is cancelled', () => {
    mockDialogRef.afterClosed.and.returnValue(of(null));
    spyOn(component as any, 'processAccountDeletion');
    
    component.openDeleteConfirmation();
    
    expect((component as any).processAccountDeletion).not.toHaveBeenCalled();
  });

  it('should handle deactivate account action', () => {
    spyOn(console, 'log');
    
    component.deactivateAccount();
    
    expect(console.log).toHaveBeenCalledWith('Deactivating account instead of deletion');
  });

  it('should handle export data action', () => {
    spyOn(console, 'log');
    
    component.exportData();
    
    expect(console.log).toHaveBeenCalledWith('Exporting user data');
  });

  it('should have proper CSS classes for styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.delete-account-page')).toBeTruthy();
    expect(compiled.querySelector('.warning-card')).toBeTruthy();
    expect(compiled.querySelector('.deletion-card')).toBeTruthy();
  });

  it('should display material icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should be responsive layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const deleteContent = compiled.querySelector('.delete-content');
    expect(deleteContent).toBeTruthy();
  });
});

describe('AppDeleteAccountConfirmationDialogComponent', () => {
  let component: AppDeleteAccountConfirmationDialogComponent;
  let fixture: ComponentFixture<AppDeleteAccountConfirmationDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<any>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [AppDeleteAccountConfirmationDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialog, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppDeleteAccountConfirmationDialogComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialog) as jasmine.SpyObj<any>;
    
    // Mock dialogRef property
    (component as any).dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dialog title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Delete Account');
  });

  it('should display warning message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('This action cannot be undone');
  });

  it('should display deletion list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Your profile and personal information');
    expect(compiled.textContent).toContain('All your documents and files');
    expect(compiled.textContent).toContain('Dashboard data and analytics');
    expect(compiled.textContent).toContain('Custom settings and preferences');
    expect(compiled.textContent).toContain('Activity history and logs');
  });

  it('should display confirmation input field', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[placeholder="DELETE"]');
    expect(input).toBeTruthy();
  });

  it('should initialize with empty confirmation text', () => {
    expect(component.confirmationText).toBe('');
  });

  it('should disable delete button when confirmation text is not DELETE', () => {
    component.confirmationText = 'WRONG';
    fixture.detectChanges();
    
    const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
    expect(deleteButton.disabled).toBe(true);
  });

  it('should enable delete button when DELETE is typed', () => {
    component.confirmationText = 'DELETE';
    fixture.detectChanges();
    
    const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
    expect(deleteButton.disabled).toBe(false);
  });

  it('should handle cancel action', () => {
    spyOn(console, 'log');
    
    component.onCancel();
    
    // onCancel should not throw any error
    expect(() => component.onCancel()).not.toThrow();
  });

  it('should handle confirm action with correct text', () => {
    spyOn(console, 'log');
    component.confirmationText = 'DELETE';
    
    component.onConfirm();
    
    expect(console.log).toHaveBeenCalledWith('Account deletion confirmed');
  });

  it('should not process deletion with wrong confirmation text', () => {
    spyOn(console, 'log');
    component.confirmationText = 'WRONG';
    
    component.onConfirm();
    
    expect(console.log).not.toHaveBeenCalledWith('Account deletion confirmed');
  });

  it('should have proper dialog structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.delete-confirmation-dialog')).toBeTruthy();
    expect(compiled.querySelector('mat-dialog-content')).toBeTruthy();
    expect(compiled.querySelector('mat-dialog-actions')).toBeTruthy();
  });

  it('should display action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    
    expect(buttons.length).toBeGreaterThanOrEqual(2);
    
    const buttonTexts = Array.from(buttons).map(btn => btn.textContent?.trim());
    expect(buttonTexts.some(text => text?.includes('Cancel'))).toBe(true);
    expect(buttonTexts.some(text => text?.includes('Delete Account'))).toBe(true);
  });

  describe('confirmation text validation', () => {
    it('should disable button when confirmation text is empty', () => {
      component.confirmationText = '';
      fixture.detectChanges();
      
      const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
      expect(deleteButton.disabled).toBe(true);
    });

    it('should disable button for lowercase delete', () => {
      component.confirmationText = 'delete';
      fixture.detectChanges();
      
      const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
      expect(deleteButton.disabled).toBe(true);
    });

    it('should disable button for partial text', () => {
      component.confirmationText = 'DEL';
      fixture.detectChanges();
      
      const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
      expect(deleteButton.disabled).toBe(true);
    });

    it('should disable button for text with extra characters', () => {
      component.confirmationText = 'DELETE ';
      fixture.detectChanges();
      
      const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
      expect(deleteButton.disabled).toBe(true);
    });

    it('should enable button only for exact DELETE text', () => {
      component.confirmationText = 'DELETE';
      fixture.detectChanges();
      
      const deleteButton = fixture.nativeElement.querySelector('button[color="warn"]');
      expect(deleteButton.disabled).toBe(false);
    });
  });
});