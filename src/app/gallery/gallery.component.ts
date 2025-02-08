import { Component, HostListener, Input, OnChanges, signal } from '@angular/core';
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

	@HostListener('document:keydown', ['$event'])
	keyPressed(event: KeyboardEvent): void {
		if (event.key == 'ArrowLeft') {
			if (this.selectionIndex() - 1 < 0) {
				this.selectionIndex.set(this.photos.length - 1);
			}
			else {
				this.selectionIndex.set(this.selectionIndex() - 1);
			}
			event.stopPropagation();
		}
		if (event.key == 'ArrowRight') {
			if (this.selectionIndex() + 1 >= this.photos.length) {
				this.selectionIndex.set(0);
			}
			else {
				this.selectionIndex.set(this.selectionIndex() + 1);
			}
			event.stopPropagation();
		}
	}
}
