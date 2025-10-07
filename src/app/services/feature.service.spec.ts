import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureService } from './feature.service';
import { FeatureCategory, Feature, FeatureToggleEvent } from '../models/feature.models';
import { of } from 'rxjs';

describe('FeatureService', () => {
  let service: FeatureService;
  let httpMock: HttpTestingController;

  const mockFeatureCategories: FeatureCategory[] = [
    {
      id: 'category1',
      name: 'Test Category 1',
      description: 'Test category description',
      icon: 'test-icon',
      order: 1,
      features: [
        {
          id: 'feature1',
          name: 'Test Feature 1',
          description: 'Test feature description',
          enabled: true,
          icon: 'feature-icon',
          children: [
            {
              id: 'child1',
              name: 'Child Feature 1',
              description: 'Child feature description',
              enabled: false,
              icon: 'child-icon',
              parentId: 'feature1'
            }
          ]
        },
        {
          id: 'feature2',
          name: 'Test Feature 2',
          description: 'Another test feature',
          enabled: false,
          icon: 'feature2-icon'
        }
      ]
    },
    {
      id: 'category2',
      name: 'Test Category 2',
      description: 'Second test category',
      icon: 'another-icon',
      order: 2,
      features: [
        {
          id: 'feature3',
          name: 'Test Feature 3',
          description: 'Third test feature',
          enabled: true,
          icon: 'feature3-icon'
        }
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureService]
    });
    service = TestBed.inject(FeatureService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Handle the constructor HTTP call
    const initialReq = httpMock.expectOne('/assets/demo-data/features.json');
    initialReq.flush([]);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadFeatures', () => {
    it('should load features from the API', () => {
      service.loadFeatures().subscribe(categories => {
        expect(categories).toEqual(mockFeatureCategories);
      });

      const req = httpMock.expectOne('/assets/demo-data/features.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockFeatureCategories);
    });

    it('should set loading state correctly', () => {
      let loadingStates: boolean[] = [];
      
      service.loading$.subscribe(loading => {
        loadingStates.push(loading);
      });

      service.loadFeatures().subscribe();

      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);

      expect(loadingStates).toContain(true);
      expect(loadingStates).toContain(false);
    });

    it('should handle load errors gracefully', () => {
      spyOn(console, 'error');

      service.loadFeatures().subscribe(categories => {
        expect(categories).toEqual([]);
      });

      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.error(new ErrorEvent('Network error'));

      expect(console.error).toHaveBeenCalled();
    });

    it('should update categories observable', () => {
      // Handle the constructor call first
      const initialReq = httpMock.expectOne('/assets/demo-data/features.json');
      initialReq.flush([]);

      // Now test the actual loadFeatures call
      service.loadFeatures().subscribe();
      
      service.categories$.subscribe(categories => {
        expect(categories).toEqual(mockFeatureCategories);
      });

      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });
  });

  describe('toggleFeature', () => {
    beforeEach(() => {
      // Pre-load categories
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should toggle parent feature', () => {
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'feature1',
        categoryId: 'category1',
        enabled: false,
        isChild: false
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(true);
      });

      service.categories$.subscribe(categories => {
        const feature = categories[0].features.find(f => f.id === 'feature1');
        expect(feature?.enabled).toBe(false);
      });
    });

    it('should toggle child feature', () => {
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'child1',
        categoryId: 'category1',
        parentId: 'feature1',
        enabled: true,
        isChild: true
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(true);
      });

      service.categories$.subscribe(categories => {
        const parentFeature = categories[0].features.find(f => f.id === 'feature1');
        const childFeature = parentFeature?.children?.find(c => c.id === 'child1');
        expect(childFeature?.enabled).toBe(true);
      });
    });

    it('should return false for non-existent feature', () => {
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'non-existent',
        categoryId: 'category1',
        enabled: true,
        isChild: false
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false for non-existent category', () => {
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'feature1',
        categoryId: 'non-existent',
        enabled: true,
        isChild: false
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(false);
      });
    });

    it('should return false for non-existent child feature', () => {
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'non-existent-child',
        categoryId: 'category1',
        parentId: 'feature1',
        enabled: true,
        isChild: true
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(false);
      });
    });
  });

  describe('getCategoryById', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should return category by ID', () => {
      service.getCategoryById('category1').subscribe(category => {
        expect(category).toEqual(mockFeatureCategories[0]);
      });
    });

    it('should return undefined for non-existent category', () => {
      service.getCategoryById('non-existent').subscribe(category => {
        expect(category).toBeUndefined();
      });
    });
  });

  describe('getFeatureById', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should return feature by ID', () => {
      service.getFeatureById('category1', 'feature1').subscribe(feature => {
        expect(feature).toEqual(mockFeatureCategories[0].features[0]);
      });
    });

    it('should return undefined for non-existent feature', () => {
      service.getFeatureById('category1', 'non-existent').subscribe(feature => {
        expect(feature).toBeUndefined();
      });
    });

    it('should return undefined for non-existent category', () => {
      service.getFeatureById('non-existent', 'feature1').subscribe(feature => {
        expect(feature).toBeUndefined();
      });
    });
  });

  describe('searchFeatures', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should return all categories for empty query', () => {
      service.searchFeatures('').subscribe(categories => {
        expect(categories).toEqual(mockFeatureCategories);
      });
    });

    it('should filter features by name', () => {
      service.searchFeatures('Feature 1').subscribe(categories => {
        expect(categories.length).toBe(1);
        expect(categories[0].features.length).toBe(1);
        expect(categories[0].features[0].name).toBe('Test Feature 1');
      });
    });

    it('should filter features by description', () => {
      service.searchFeatures('Another test').subscribe(categories => {
        expect(categories.length).toBe(1);
        expect(categories[0].features.length).toBe(1);
        expect(categories[0].features[0].name).toBe('Test Feature 2');
      });
    });

    it('should find features by child feature name', () => {
      service.searchFeatures('Child Feature').subscribe(categories => {
        expect(categories.length).toBe(1);
        expect(categories[0].features.length).toBe(1);
        expect(categories[0].features[0].name).toBe('Test Feature 1');
      });
    });

    it('should return empty array for no matches', () => {
      service.searchFeatures('no matches').subscribe(categories => {
        expect(categories).toEqual([]);
      });
    });

    it('should be case insensitive', () => {
      service.searchFeatures('TEST FEATURE 1').subscribe(categories => {
        expect(categories.length).toBe(1);
        expect(categories[0].features[0].name).toBe('Test Feature 1');
      });
    });
  });

  describe('getEnabledFeatures', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should return only enabled features', () => {
      service.getEnabledFeatures().subscribe(enabledFeatures => {
        expect(enabledFeatures.length).toBe(2);
        expect(enabledFeatures[0].feature.name).toBe('Test Feature 1');
        expect(enabledFeatures[1].feature.name).toBe('Test Feature 3');
      });
    });

    it('should include category information', () => {
      service.getEnabledFeatures().subscribe(enabledFeatures => {
        expect(enabledFeatures[0].category.name).toBe('Test Category 1');
        expect(enabledFeatures[1].category.name).toBe('Test Category 2');
      });
    });
  });

  describe('getFeatureProfile', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should return feature profile with metrics', () => {
      service.getFeatureProfile().subscribe(profile => {
        expect(profile.totalFeatures).toBe(4); // 3 parent features + 1 child feature
        expect(profile.enabledFeatures).toBe(2); // feature1 and feature3 are enabled
        expect(profile.categories.length).toBe(2);
      });
    });
  });

  describe('exportConfiguration', () => {
    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should export configuration with correct structure', () => {
      service.exportConfiguration().subscribe(config => {
        expect(config.exportDate).toBeDefined();
        expect(config.categories).toBeDefined();
        expect(config.categories.length).toBe(2);
      });
    });

    it('should include feature states in export', () => {
      service.exportConfiguration().subscribe(config => {
        const category1 = config.categories.find((c: any) => c.id === 'category1');
        expect(category1.features.length).toBe(2);
        expect(category1.features[0].enabled).toBe(true);
        expect(category1.features[1].enabled).toBe(false);
      });
    });

    it('should include child feature states', () => {
      service.exportConfiguration().subscribe(config => {
        const category1 = config.categories.find((c: any) => c.id === 'category1');
        const feature1 = category1.features.find((f: any) => f.id === 'feature1');
        expect(feature1.children).toBeDefined();
        expect(feature1.children.length).toBe(1);
        expect(feature1.children[0].enabled).toBe(false);
      });
    });

    it('should have valid export date', () => {
      service.exportConfiguration().subscribe(config => {
        const exportDate = new Date(config.exportDate);
        expect(exportDate instanceof Date).toBe(true);
        expect(isNaN(exportDate.getTime())).toBe(false);
      });
    });
  });

  describe('importConfiguration', () => {
    const mockConfig = {
      exportDate: '2023-01-01T00:00:00.000Z',
      categories: [
        {
          id: 'category1',
          features: [
            {
              id: 'feature1',
              enabled: false,
              children: [
                { id: 'child1', enabled: true }
              ]
            },
            { id: 'feature2', enabled: true }
          ]
        }
      ]
    };

    beforeEach(() => {
      service.loadFeatures().subscribe();
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);
    });

    it('should import configuration successfully', () => {
      service.importConfiguration(mockConfig).subscribe(result => {
        expect(result).toBe(true);
      });
    });

    it('should update feature states from import', () => {
      service.importConfiguration(mockConfig).subscribe();

      service.categories$.subscribe(categories => {
        const feature1 = categories[0].features.find(f => f.id === 'feature1');
        const feature2 = categories[0].features.find(f => f.id === 'feature2');
        
        expect(feature1?.enabled).toBe(false);
        expect(feature2?.enabled).toBe(true);
      });
    });

    it('should update child feature states from import', () => {
      service.importConfiguration(mockConfig).subscribe();

      service.categories$.subscribe(categories => {
        const feature1 = categories[0].features.find(f => f.id === 'feature1');
        const child1 = feature1?.children?.find(c => c.id === 'child1');
        
        expect(child1?.enabled).toBe(true);
      });
    });

    it('should handle invalid configuration gracefully', () => {
      spyOn(console, 'error');
      
      service.importConfiguration(null).subscribe(result => {
        expect(result).toBe(false);
      });

      expect(console.error).toHaveBeenCalled();
    });

    it('should handle malformed configuration', () => {
      spyOn(console, 'error');
      
      const invalidConfig = { invalid: 'structure' };
      
      service.importConfiguration(invalidConfig).subscribe(result => {
        expect(result).toBe(false);
      });

      expect(console.error).toHaveBeenCalled();
    });

    it('should handle missing categories gracefully', () => {
      const configWithMissingCategory = {
        exportDate: '2023-01-01T00:00:00.000Z',
        categories: [
          {
            id: 'non-existent-category',
            features: [{ id: 'feature1', enabled: false }]
          }
        ]
      };

      service.importConfiguration(configWithMissingCategory).subscribe(result => {
        expect(result).toBe(true); // Should still succeed for partial import
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle HTTP errors in loadFeatures', () => {
      spyOn(console, 'error');

      service.loadFeatures().subscribe(
        categories => expect(categories).toEqual([]),
        error => fail('Should not emit error')
      );

      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.error(new ErrorEvent('Network error'));

      expect(console.error).toHaveBeenCalled();
    });

    it('should handle errors in toggleFeature gracefully', () => {
      // Don't load categories first to test error handling
      const toggleEvent: FeatureToggleEvent = {
        featureId: 'feature1',
        categoryId: 'category1',
        enabled: false,
        isChild: false
      };

      service.toggleFeature(toggleEvent).subscribe(result => {
        expect(result).toBe(false);
      });
    });
  });

  describe('Observable Streams', () => {
    it('should provide categories$ observable', () => {
      expect(service.categories$).toBeDefined();
      
      service.categories$.subscribe(categories => {
        expect(Array.isArray(categories)).toBe(true);
      });
    });

    it('should provide loading$ observable', () => {
      expect(service.loading$).toBeDefined();
      
      service.loading$.subscribe(loading => {
        expect(typeof loading).toBe('boolean');
      });
    });

    it('should emit loading state changes', () => {
      const loadingStates: boolean[] = [];
      
      service.loading$.subscribe(loading => {
        loadingStates.push(loading);
      });

      service.loadFeatures().subscribe();
      
      const req = httpMock.expectOne('/assets/demo-data/features.json');
      req.flush(mockFeatureCategories);

      expect(loadingStates.length).toBeGreaterThan(1);
      expect(loadingStates).toContain(true);
      expect(loadingStates).toContain(false);
    });
  });
});