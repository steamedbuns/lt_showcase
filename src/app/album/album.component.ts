import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Album } from '../models/album';
import { AlbumApiService } from '../services/album-api.service';
import { GalleryComponent } from "../gallery/gallery.component";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [FormsModule, MatFormFieldModule, MatProgressBarModule, MatSelectModule, MatInputModule, MatButtonModule, MatDividerModule, MatIconModule, GalleryComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
	private router = inject(Router);
	private albumService = inject(AlbumApiService);

	busy = signal(false);
	albums = new Array<Album>;

	selectedAlbum: Album = this.albums[0];

	ngOnInit(): void {
		this.busy.set(true);
		if (this.albums.length === 0) {
			this.albumService.getAllAlbums()
				.subscribe((data) => {
					if (data.length > 0) {
						this.albums = data;
						this.selectedAlbum = this.albums[0];
					} else {
						this.router.navigate(['']);
					}
					this.busy.set(false);
				});
		} else {
			this.busy.set(false);
		}
	}

	viewAllPhotos(): void {
		this.router.navigate(['all-photos']);
	}
}
