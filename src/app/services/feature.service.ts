import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { 
  FeatureCategory, 
  Feature, 
  FeatureChild, 
  FeatureProfile, 
  FeatureToggleEvent 
} from '../models/feature.models';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  
  private featuresUrl = '/assets/demo-data/features.json';
  private categoriesSubject = new BehaviorSubject<FeatureCategory[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public categories$ = this.categoriesSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadFeatures();
  }

  loadFeatures(): Observable<FeatureCategory[]> {
    this.loadingSubject.next(true);
    
    return this.http.get<FeatureCategory[]>(this.featuresUrl)
      .pipe(
        tap(categories => {
          this.categoriesSubject.next(categories);
          this.loadingSubject.next(false);
        }),
        catchError(error => {
          console.error('Error loading features:', error);
          this.loadingSubject.next(false);
          return of([]);
        })
      );
  }

  getFeatureProfile(): Observable<FeatureProfile> {
    return this.categories$.pipe(
      map(categories => {
        const totalFeatures = categories.reduce((total, category) => {
          return total + category.features.reduce((catTotal, feature) => {
            return catTotal + 1 + (feature.children?.length || 0);
          }, 0);
        }, 0);

        const enabledFeatures = categories.reduce((total, category) => {
          return total + category.features.reduce((catTotal, feature) => {
            let enabled = feature.enabled ? 1 : 0;
            enabled += feature.children?.filter(child => child.enabled).length || 0;
            return catTotal + enabled;
          }, 0);
        }, 0);

        return {
          categories,
          totalFeatures,
          enabledFeatures
        };
      })
    );
  }

  toggleFeature(event: FeatureToggleEvent): Observable<boolean> {
    const categories = this.categoriesSubject.value;
    const updatedCategories = categories.map(category => {
      if (category.id === event.categoryId) {
        const updatedFeatures = category.features.map(feature => {
          if (event.isChild && event.parentId === feature.id) {
            // Toggle child feature
            const updatedChildren = feature.children?.map(child => {
              if (child.id === event.featureId) {
                return { ...child, enabled: event.enabled };
              }
              return child;
            });
            return { ...feature, children: updatedChildren };
          } else if (!event.isChild && feature.id === event.featureId) {
            // Toggle parent feature
            const updatedFeature = { ...feature, enabled: event.enabled };
            
            // If disabling parent, disable all children
            if (!event.enabled && feature.children) {
              updatedFeature.children = feature.children.map(child => ({
                ...child,
                enabled: false
              }));
            }
            
            return updatedFeature;
          }
          return feature;
        });
        
        return { ...category, features: updatedFeatures };
      }
      return category;
    });

    this.categoriesSubject.next(updatedCategories);
    
    // Simulate API call
    return of(true).pipe(
      tap(() => {
        console.log('Feature toggled:', event);
      }),
      catchError(error => {
        console.error('Error toggling feature:', error);
        return of(false);
      })
    );
  }

  getCategoryById(categoryId: string): Observable<FeatureCategory | undefined> {
    return this.categories$.pipe(
      map(categories => categories.find(cat => cat.id === categoryId))
    );
  }

  getFeatureById(categoryId: string, featureId: string): Observable<Feature | undefined> {
    return this.getCategoryById(categoryId).pipe(
      map(category => category?.features.find(feature => feature.id === featureId))
    );
  }

  searchFeatures(query: string): Observable<FeatureCategory[]> {
    return this.categories$.pipe(
      map(categories => {
        if (!query.trim()) return categories;
        
        const searchTerm = query.toLowerCase();
        
        return categories.map(category => ({
          ...category,
          features: category.features.filter(feature => {
            const featureMatches = 
              feature.name.toLowerCase().includes(searchTerm) ||
              feature.description.toLowerCase().includes(searchTerm);
            
            const childMatches = feature.children?.some(child =>
              child.name.toLowerCase().includes(searchTerm) ||
              child.description.toLowerCase().includes(searchTerm)
            );
            
            return featureMatches || childMatches;
          })
        })).filter(category => category.features.length > 0);
      })
    );
  }

  getEnabledFeatures(): Observable<{feature: Feature, category: FeatureCategory}[]> {
    return this.categories$.pipe(
      map(categories => {
        const enabled: {feature: Feature, category: FeatureCategory}[] = [];
        
        categories.forEach(category => {
          category.features.forEach(feature => {
            if (feature.enabled) {
              enabled.push({ feature, category });
            }
          });
        });
        
        return enabled;
      })
    );
  }

  exportConfiguration(): Observable<any> {
    return this.categories$.pipe(
      map(categories => ({
        exportDate: new Date().toISOString(),
        categories: categories.map(category => ({
          id: category.id,
          features: category.features.map(feature => ({
            id: feature.id,
            enabled: feature.enabled,
            children: feature.children?.map(child => ({
              id: child.id,
              enabled: child.enabled
            }))
          }))
        }))
      }))
    );
  }

  importConfiguration(config: any): Observable<boolean> {
    try {
      const categories = this.categoriesSubject.value;
      const updatedCategories = categories.map(category => {
        const categoryConfig = config.categories.find((c: any) => c.id === category.id);
        if (!categoryConfig) return category;

        const updatedFeatures = category.features.map(feature => {
          const featureConfig = categoryConfig.features.find((f: any) => f.id === feature.id);
          if (!featureConfig) return feature;

          const updatedChildren = feature.children?.map(child => {
            const childConfig = featureConfig.children?.find((c: any) => c.id === child.id);
            return childConfig ? { ...child, enabled: childConfig.enabled } : child;
          });

          return {
            ...feature,
            enabled: featureConfig.enabled,
            children: updatedChildren
          };
        });

        return { ...category, features: updatedFeatures };
      });

      this.categoriesSubject.next(updatedCategories);
      return of(true);
    } catch (error) {
      console.error('Error importing configuration:', error);
      return of(false);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}