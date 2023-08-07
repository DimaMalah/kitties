import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cat-picture',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cat-picture.component.html',
  styleUrls: ['./cat-picture.component.scss'],
})
export class CatPictureComponent {
  @Input() url = '';
  @Input() breed = '';
  @Input() description = '';
}
