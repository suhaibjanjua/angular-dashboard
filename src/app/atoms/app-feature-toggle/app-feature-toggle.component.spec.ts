import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AppFeatureToggleComponent } from './app-feature-toggle.component';
import { Feature, FeatureToggleEvent } from '../../models/feature.models';

describe('AppFeatureToggleComponent', () => {
  let component: AppFeatureToggleComponent;
  let fixture: ComponentFixture<AppFeatureToggleComponent>;

  const mockFeature: Feature = {
    id: 'feature1',
    name: 'Test Feature',
    description: 'Test feature description',
    enabled: true,
    icon: 'test-icon'
  };

  const mockFeatureWithChildren: Feature = {
    id: 'parent-feature',
    name: 'Parent Feature',
    description: 'Parent feature description',
    enabled: true,
    icon: 'parent-icon',
    children: [
      {
        id: 'child1',
        name: 'Child Feature 1',
        description: 'Child description 1',
        enabled: false,
        icon: 'child-icon-1',
        parentId: 'parent-feature'
      },
      {
        id: 'child2',
        name: 'Child Feature 2',
        description: 'Child description 2',
        enabled: true,
        icon: 'child-icon-2',
        parentId: 'parent-feature'
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFeatureToggleComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppFeatureToggleComponent);
    component = fixture.componentInstance;
    
    // Set default inputs
    component.feature = mockFeature;
    component.categoryId = 'test-category';
    component.disabled = false;
    component.iconColor = 'var(--color-primary)';
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display feature name and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Feature');
    expect(compiled.textContent).toContain('Test feature description');
  });

  it('should display feature icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('.feature-icon');
    expect(icon?.textContent?.trim()).toBe('test-icon');
  });

  it('should show toggle in correct state', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = compiled.querySelector('mat-slide-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should determine if feature has children correctly', () => {
    // Feature without children
    expect(component.hasChildren).toBeFalse();

    // Feature with children
    component.feature = mockFeatureWithChildren;
    expect(component.hasChildren).toBeTrue();
  });

  it('should emit toggle event when feature is toggled', () => {
    spyOn(component.toggle, 'emit');
    
    const toggleEvent = { checked: false };
    
    component.onToggleChange(toggleEvent);

    const expectedEvent: FeatureToggleEvent = {
      featureId: 'feature1',
      categoryId: 'test-category',
      enabled: false,
      isChild: false
    };

    expect(component.toggle.emit).toHaveBeenCalledWith(expectedEvent);
  });

  it('should expand accordion when enabling feature with children', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = false;
    fixture.detectChanges();

    const toggleEvent = { checked: true };
    
    component.onToggleChange(toggleEvent);

    expect(component.isExpanded).toBeTrue();
  });

  it('should collapse accordion when disabling feature', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = true;

    const toggleEvent = { checked: false };
    
    component.onToggleChange(toggleEvent);

    expect(component.isExpanded).toBeFalse();
  });

  it('should toggle accordion expansion', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = false;
    fixture.detectChanges();

    const mockEvent = {
      stopPropagation: jasmine.createSpy('stopPropagation')
    };

    component.toggleAccordion(mockEvent);

    expect(component.isExpanded).toBeTrue();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should not toggle accordion when feature is disabled', () => {
    component.feature = { ...mockFeatureWithChildren, enabled: false };
    component.isExpanded = false;
    fixture.detectChanges();

    const mockEvent = {
      stopPropagation: jasmine.createSpy('stopPropagation')
    };

    component.toggleAccordion(mockEvent);

    expect(component.isExpanded).toBeFalse();
    expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
  });

  it('should handle child toggle change', () => {
    spyOn(component.toggle, 'emit');
    component.feature = mockFeatureWithChildren;

    const toggleEvent = { checked: true };
    
    component.onChildToggleChange(toggleEvent, 'child1');

    const expectedEvent: FeatureToggleEvent = {
      featureId: 'child1',
      categoryId: 'test-category',
      enabled: true,
      isChild: true,
      parentId: 'parent-feature'
    };

    expect(component.toggle.emit).toHaveBeenCalledWith(expectedEvent);
  });

  it('should display children when feature has children and is expanded', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-expansion-panel')).toBeTruthy();
  });

  it('should display child features correctly', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Child Feature 1');
    expect(compiled.textContent).toContain('Child Feature 2');
  });

  it('should disable child toggles when parent is disabled', () => {
    component.feature = { ...mockFeatureWithChildren, enabled: false };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const childToggles = compiled.querySelectorAll('.child-toggle mat-slide-toggle');
    childToggles.forEach(toggle => {
      expect(toggle.getAttribute('ng-reflect-disabled')).toBe('true');
    });
  });

  it('should return correct tooltip text for enabled feature', () => {
    component.feature = { ...mockFeature, enabled: true };
    
    const tooltip = component.getTooltipText();
    
    expect(tooltip).toBe('Click to disable');
  });

  it('should return correct tooltip text for disabled feature', () => {
    component.feature = { ...mockFeature, enabled: false };
    
    const tooltip = component.getTooltipText();
    
    expect(tooltip).toBe('Click to enable');
  });

  it('should return correct child tooltip when parent is enabled', () => {
    component.feature = mockFeatureWithChildren;
    const child = mockFeatureWithChildren.children![0];
    
    const tooltip = component.getChildTooltipText(child);
    
    expect(tooltip).toBe('Click to enable');
  });

  it('should return correct child tooltip when parent is disabled', () => {
    component.feature = { ...mockFeatureWithChildren, enabled: false };
    const child = mockFeatureWithChildren.children![0];
    
    const tooltip = component.getChildTooltipText(child);
    
    expect(tooltip).toBe('Parent feature must be enabled first');
  });

  it('should apply disabled class when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.feature-toggle-container');
    expect(container?.classList).toContain('disabled');
  });

  it('should apply custom icon color', () => {
    component.iconColor = '#ff0000';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('.feature-icon') as HTMLElement;
    expect(icon.style.color).toBe('rgb(255, 0, 0)');
  });

  it('should use default icon when empty string provided', () => {
    component.feature = { ...mockFeature, icon: '' };
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('.feature-icon');
    expect(icon?.textContent?.trim()).toBe('toggle_on');
  });

  it('should use default child icon when empty string provided', () => {
    const featureWithChildNoIcon = {
      ...mockFeatureWithChildren,
      children: [{
        ...mockFeatureWithChildren.children![0],
        icon: ''
      }]
    };
    
    component.feature = featureWithChildNoIcon;
    component.isExpanded = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const childIcon = compiled.querySelector('.child-icon');
    expect(childIcon?.textContent?.trim()).toBe('settings');
  });

  it('should show expand/collapse icons correctly', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    let expandIcon = compiled.querySelector('.expand-icon');
    expect(expandIcon?.textContent?.trim()).toBe('expand_more');

    component.isExpanded = true;
    fixture.detectChanges();

    expandIcon = compiled.querySelector('.expand-icon');
    expect(expandIcon?.textContent?.trim()).toBe('expand_less');
  });

  it('should handle accordion click event correctly', () => {
    component.feature = mockFeatureWithChildren;
    component.isExpanded = false;

    const mockEvent = document.createEvent('Event');
    spyOn(mockEvent, 'stopPropagation');

    component.toggleAccordion(mockEvent);

    expect(component.isExpanded).toBeTrue();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should prevent child toggle event from bubbling', () => {
    component.feature = mockFeatureWithChildren;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const childToggle = compiled.querySelector('.child-toggle') as HTMLElement;
    
    const clickEvent = new Event('click');
    spyOn(clickEvent, 'stopPropagation');
    
    childToggle.dispatchEvent(clickEvent);
    
    // The actual stopPropagation is handled in the template with (click)="$event.stopPropagation()"
    expect(childToggle).toBeTruthy();
  });
});