import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnChanges {
	@Input({required: true}) photos!: Array<Photo>;
	selectionIndex = signal(0);

	ngOnChanges() {
		this.selectionIndex.set(0);
	}
}
