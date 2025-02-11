import { Component, inject, OnInit, signal } from '@angular/core';
import { AlbumApiService } from '../services/album-api.service';
import { FormsModule } from '@angular/forms';
import { Photo } from '../models/photo';
import { GalleryComponent } from '../gallery/gallery.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-photos',
  imports: [FormsModule, GalleryComponent, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './all-photos.component.html',
  styleUrl: './all-photos.component.scss'
})
export class AllPhotosComponent implements OnInit {
	private router = inject(Router);
	private albumService = inject(AlbumApiService);

	busy = signal(false);
	photos!: Array<Photo>;
	filteredPhotos!: Array<Photo>;
	searchString: string = '';

	ngOnInit(): void {
		this.busy.set(true);
		if (this.photos.length === 0) {
			this.albumService.getAllPhotos(this.searchString)
				.subscribe((data) => {
					if (data.length > 0) {
						this.photos = data;
					} else {
						this.router.navigate(['']);
					}
					this.busy.set(false);
				});
		} else {
			this.busy.set(false);
		}
	}

	onKeyPressed(event: KeyboardEvent): void {
		if (event.key == 'Enter') {
			this.albumService.getAllPhotos(this.searchString)
				.subscribe((data) => {
					this.photos = data;
				});
		}
	}

	viewAlbums(): void {
		this.router.navigate(['/albums']);
	}
}
