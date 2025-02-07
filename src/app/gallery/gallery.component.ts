import { Component, Input, signal } from '@angular/core';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
	@Input({required: true}) photos!: Array<Photo>;
	selectionIndex = signal(0);
}
