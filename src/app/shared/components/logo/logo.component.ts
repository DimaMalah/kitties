import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div
      class="logo"
      [ngClass]="{ large: size === 'large', small: size === 'small' }"
    ></div>
  `,
  styleUrls: ['./logo.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LogoComponent {
  @Input() size: 'large' | 'small' = 'large';
}
