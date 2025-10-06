import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { Feature, FeatureToggleEvent } from '../../models/feature.models';

@Component({
  selector: 'app-feature-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule
  ],
  template: `
    <div class="feature-toggle-container" 
         [class.disabled]="disabled">
      
      <!-- Feature without children -->
      <div class="feature-header" *ngIf="!hasChildren">
        <div class="feature-info">
          <div class="feature-title">
            <mat-icon class="feature-icon" [style.color]="iconColor">
              {{ feature.icon || 'toggle_on' }}
            </mat-icon>
            <span class="feature-name">{{ feature.name }}</span>
          </div>
          
          <mat-slide-toggle 
            [checked]="feature.enabled"
            [disabled]="disabled"
            (change)="onToggleChange($event)"
            [matTooltip]="getTooltipText()"
            class="feature-toggle">
          </mat-slide-toggle>
        </div>
        
        <p class="feature-description">{{ feature.description }}</p>
      </div>

      <!-- Feature with children using accordion -->
      <mat-expansion-panel 
        *ngIf="hasChildren" 
        [expanded]="isExpanded && feature.enabled" 
        [disabled]="!feature.enabled"
        class="feature-accordion"
        hideToggle>
        
        <mat-expansion-panel-header 
          class="feature-accordion-header"
          (click)="toggleAccordion($event)">
          
          <div class="feature-info-accordion">
            <div class="feature-title">
              <mat-icon class="feature-icon" [style.color]="iconColor">
                {{ feature.icon || 'toggle_on' }}
              </mat-icon>
              <span class="feature-name">{{ feature.name }}</span>
              <mat-icon class="expand-icon" [class.expanded]="isExpanded && feature.enabled">
                {{ (isExpanded && feature.enabled) ? 'expand_less' : 'expand_more' }}
              </mat-icon>
            </div>
            
            <mat-slide-toggle 
              [checked]="feature.enabled"
              [disabled]="disabled"
              (change)="onToggleChange($event)"
              (click)="$event.stopPropagation()"
              [matTooltip]="getTooltipText()"
              class="feature-toggle">
            </mat-slide-toggle>
          </div>
          
          <p class="feature-description">{{ feature.description }}</p>
        </mat-expansion-panel-header>

        <!-- Child Features -->
        <div class="child-features">
          <div class="child-feature" 
               *ngFor="let child of feature.children"
               [class.disabled]="!feature.enabled">
            
            <div class="child-header">
              <div class="child-info">
                <div class="child-title">
                  <mat-icon class="child-icon">{{ child.icon || 'settings' }}</mat-icon>
                  <span class="child-name">{{ child.name }}</span>
                </div>
                
                <mat-slide-toggle 
                  [checked]="child.enabled"
                  [disabled]="!feature.enabled || disabled"
                  (change)="onChildToggleChange($event, child.id)"
                  [matTooltip]="getChildTooltipText(child)"
                  class="child-toggle">
                </mat-slide-toggle>
              </div>
              
              <p class="child-description">{{ child.description }}</p>
            </div>
          </div>
        </div>
      </mat-expansion-panel>
    </div>
  `,
  styleUrls: ['./app-feature-toggle.component.scss']
})
export class AppFeatureToggleComponent {
  @Input() feature!: Feature;
  @Input() categoryId!: string;
  @Input() disabled = false;
  @Input() iconColor = '#6c4bb6';
  
  @Output() toggle = new EventEmitter<FeatureToggleEvent>();
  
  isExpanded = false;
  
  get hasChildren(): boolean {
    return !!(this.feature?.children && this.feature.children.length > 0);
  }

  toggleAccordion(event: any): void {
    if (this.feature.enabled) {
      event.stopPropagation();
      this.isExpanded = !this.isExpanded;
    }
  }
  
  onToggleChange(event: any): void {
    const toggleEvent: FeatureToggleEvent = {
      featureId: this.feature.id,
      categoryId: this.categoryId,
      enabled: event.checked,
      isChild: false
    };
    
    // Auto-expand when enabling feature with children
    if (event.checked && this.hasChildren) {
      this.isExpanded = true;
    } else if (!event.checked) {
      this.isExpanded = false;
    }
    
    this.toggle.emit(toggleEvent);
  }

  onChildToggleChange(event: any, childId: string): void {
    const toggleEvent: FeatureToggleEvent = {
      featureId: childId,
      categoryId: this.categoryId,
      enabled: event.checked,
      isChild: true,
      parentId: this.feature.id
    };
    
    this.toggle.emit(toggleEvent);
  }

  getTooltipText(): string {
    return this.feature.enabled ? 'Click to disable' : 'Click to enable';
  }

  getChildTooltipText(child: any): string {
    if (!this.feature.enabled) {
      return 'Parent feature must be enabled first';
    }
    return child.enabled ? 'Click to disable' : 'Click to enable';
  }
}