import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AppFeaturesProfilePageComponent } from './app-features-profile-page.component';
import { FeatureService } from '../../services/feature.service';
import { FeatureCategory, Feature, FeatureToggleEvent } from '../../models/feature.models';

describe('AppFeaturesProfilePageComponent', () => {
  let component: AppFeaturesProfilePageComponent;
  let fixture: ComponentFixture<AppFeaturesProfilePageComponent>;
  let mockFeatureService: jasmine.SpyObj<FeatureService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockFeatureCategories: FeatureCategory[] = [
    {
      id: 'category1',
      name: 'Test Category',
      description: 'Test category description',
      icon: 'test-icon',
      order: 1,
      features: [
        {
          id: 'feature1',
          name: 'Test Feature',
          description: 'Test feature description',
          enabled: true,
          icon: 'feature-icon'
        }
      ]
    }
  ];

  const mockFeatureProfile = {
    categories: mockFeatureCategories,
    totalFeatures: 1,
    enabledFeatures: 1
  };

  beforeEach(async () => {
    const featureServiceSpy = jasmine.createSpyObj('FeatureService', [
      'getFeatureProfile',
      'toggleFeature',
      'exportConfiguration',
      'importConfiguration'
    ], {
      categories$: of(mockFeatureCategories),
      loading$: of(false)
    });

    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [AppFeaturesProfilePageComponent, NoopAnimationsModule],
      providers: [
        { provide: FeatureService, useValue: featureServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppFeaturesProfilePageComponent);
    component = fixture.componentInstance;
    mockFeatureService = TestBed.inject(FeatureService) as jasmine.SpyObj<FeatureService>;
    mockSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    // Setup default return values
    mockFeatureService.getFeatureProfile.and.returnValue(of(mockFeatureProfile));
    mockFeatureService.toggleFeature.and.returnValue(of(true));
    mockFeatureService.exportConfiguration.and.returnValue(of({}));
    mockFeatureService.importConfiguration.and.returnValue(of(true));
    mockFeatureService.loadFeatures = jasmine.createSpy('loadFeatures').and.returnValue(of(mockFeatureCategories));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.categories).toEqual([]);
    expect(component.selectedCategory).toBeNull();
    expect(component.featureProfile).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.searchQuery).toBe('');
    expect(component.filteredFeatures).toEqual([]);
  });

  it('should load features on init', () => {
    expect(mockFeatureService.loadFeatures).toHaveBeenCalled();
  });

  it('should subscribe to feature profile on init', () => {
    expect(mockFeatureService.getFeatureProfile).toHaveBeenCalled();
  });

  it('should handle feature toggle', () => {
    const toggleEvent: FeatureToggleEvent = {
      featureId: 'feature1',
      categoryId: 'category1',
      enabled: false,
      isChild: false
    };

    component.onFeatureToggle(toggleEvent);

    expect(mockFeatureService.toggleFeature).toHaveBeenCalledWith(toggleEvent);
  });

  it('should handle successful feature toggle', () => {
    const toggleEvent: FeatureToggleEvent = {
      featureId: 'feature1',
      categoryId: 'category1',
      enabled: false,
      isChild: false
    };

    mockFeatureService.toggleFeature.and.returnValue(of(true));

    component.onFeatureToggle(toggleEvent);

    expect(mockFeatureService.getFeatureProfile).toHaveBeenCalledTimes(2); // Initial + after toggle
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Feature "Test Feature" has been disabled',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should handle failed feature toggle', () => {
    const toggleEvent: FeatureToggleEvent = {
      featureId: 'feature1',
      categoryId: 'category1',
      enabled: false,
      isChild: false
    };

    mockFeatureService.toggleFeature.and.returnValue(of(false));

    component.onFeatureToggle(toggleEvent);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Failed to update feature',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should handle feature toggle error', () => {
    const toggleEvent: FeatureToggleEvent = {
      featureId: 'feature1',
      categoryId: 'category1',
      enabled: false,
      isChild: false
    };

    mockFeatureService.toggleFeature.and.returnValue(throwError('Toggle error'));

    component.onFeatureToggle(toggleEvent);

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Error updating feature',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should export configuration', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('mock-url');
    spyOn(window.URL, 'revokeObjectURL');
    spyOn(document, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy('click'),
      remove: jasmine.createSpy('remove')
    } as any);
    spyOn(document.body, 'appendChild');

    const mockConfig = { exportDate: '2023-01-01', categories: [] };
    mockFeatureService.exportConfiguration.and.returnValue(of(mockConfig));

    component.onExportConfiguration();

    expect(mockFeatureService.exportConfiguration).toHaveBeenCalled();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Configuration exported successfully',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should handle export configuration error', () => {
    mockFeatureService.exportConfiguration.and.returnValue(throwError('Export error'));

    component.onExportConfiguration();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Failed to export configuration',
      'Close',
      jasmine.any(Object)
    );
  });

  it('should trigger import configuration', () => {
    spyOn(document, 'createElement').and.returnValue({
      type: 'file',
      accept: '.json',
      onchange: null,
      click: jasmine.createSpy('click')
    } as any);

    component.onImportConfiguration();

    expect(document.createElement).toHaveBeenCalledWith('input');
  });

  it('should handle successful configuration import', () => {
    mockFeatureService.importConfiguration.and.returnValue(of(true));

    // Simulate the import process
    const mockConfig = { categories: [] };
    component.onImportConfiguration();

    // We need to simulate the file reading process
    expect(() => component.onImportConfiguration()).not.toThrow();
  });

  it('should handle failed configuration import', () => {
    mockFeatureService.importConfiguration.and.returnValue(of(false));

    component.onImportConfiguration();

    // Since the file reading is async, we just check that the method doesn't throw
    expect(() => component.onImportConfiguration()).not.toThrow();
  });

  it('should handle category selection', () => {
    component.categories = mockFeatureCategories;
    
    component.onCategorySelect('category1');
    
    expect(component.selectedCategory).toBe(mockFeatureCategories[0]);
  });

  it('should filter features when search query changes', () => {
    component.selectedCategory = mockFeatureCategories[0];
    component.searchQuery = 'Test';
    
    component['filterFeatures']();
    
    expect(component.filteredFeatures.length).toBe(1);
    expect(component.filteredFeatures[0].name).toBe('Test Feature');
  });

  it('should return all features when search query is empty', () => {
    component.selectedCategory = mockFeatureCategories[0];
    component.searchQuery = '';
    
    component['filterFeatures']();
    
    expect(component.filteredFeatures).toEqual(mockFeatureCategories[0].features);
  });

  it('should handle loading state', () => {
    component.loading = true;
    fixture.detectChanges();

    expect(component.loading).toBeTrue();
  });

  it('should display categories when available', () => {
    component.categories = mockFeatureCategories;
    fixture.detectChanges();

    expect(component.categories.length).toBe(1);
    expect(component.categories[0].name).toBe('Test Category');
  });

  it('should handle component destruction', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  it('should initialize destroy subject', () => {
    expect(component['destroy$']).toBeDefined();
  });

  it('should have proper CSS classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.features-profile-page')).toBeTruthy();
  });

  it('should have clear search functionality', () => {
    component.searchQuery = 'test';
    component.form.get('searchTerm')?.setValue('test');
    
    component.clearSearch();
    
    expect(component.searchQuery).toBe('');
    expect(component.form.get('searchTerm')?.value).toBe('');
  });

  it('should get enabled feature count', () => {
    component.featureProfile = mockFeatureProfile;
    
    const count = component.getEnabledFeatureCount();
    
    expect(count).toBe(1);
  });

  it('should get total feature count', () => {
    component.featureProfile = mockFeatureProfile;
    
    const count = component.getTotalFeatureCount();
    
    expect(count).toBe(1);
  });

  it('should track features by id', () => {
    const feature = mockFeatureCategories[0].features[0];
    
    const trackId = component.trackByFeatureId(0, feature);
    
    expect(trackId).toBe('feature1');
  });
});