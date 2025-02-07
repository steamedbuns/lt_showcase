import { Component, Input, OnChanges, signal } from '@angular/core';
import { Photo } from '../models/photo';
import { PhotoComponent } from './photo.component';

@Component({
  selector: 'app-gallery',
  imports: [PhotoComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnChanges {
	@Input({required: true}) photos!: Array<Photo>;
	selectionIndex = signal(0);

	ngOnChanges() {
		this.selectionIndex.set(0);
	}
}
