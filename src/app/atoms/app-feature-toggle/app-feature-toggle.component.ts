import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Feature, FeatureToggleEvent } from '../../models/feature.models';

@Component({
  selector: 'app-feature-toggle',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="feature-toggle-container" 
         [class.disabled]="disabled">
      
      <div class="feature-header">
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

      <!-- Child Features -->
      <div class="child-features" *ngIf="feature.children && feature.children.length > 0">
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

  onToggleChange(event: any): void {
    const toggleEvent: FeatureToggleEvent = {
      featureId: this.feature.id,
      categoryId: this.categoryId,
      enabled: event.checked,
      isChild: false
    };
    
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