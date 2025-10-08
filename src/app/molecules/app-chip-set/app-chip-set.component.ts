import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

interface ChipConfig {
  value: string;
  icon?: string;
  showIcon?: boolean;
  bgClass?: string;
}

@Component({
  selector: 'app-chip-set',
  standalone: true,
  imports: [MatChipsModule, MatIconModule, NgFor, NgIf, NgClass],
  templateUrl: './app-chip-set.component.html',
  styleUrl: './app-chip-set.component.scss'
})
export class AppChipSetComponent {

  private _chips = signal<ChipConfig[]>([]);
  @Input() set chipSet(value: ChipConfig[]) {
    this._chips.set(value);
  }

  readonly chips = this._chips;

}
