import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Album } from '../models/album';
import { AlbumApiService } from '../services/album-api.service';

@Component({
  selector: 'app-album',
  imports: [FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit {
	private albumService = inject(AlbumApiService);

	busy = signal(false);
	albums = new Array<Album>;

	selectedAlbum: Album = this.albums[0];
	selectionIndex = 0;

	public ngOnInit(): void {
		this.busy.set(true);
		if (this.albums.length === 0) {
			this.albumService.getAllAlbums()
				.subscribe((data) => {
					if (data !== null) {
						this.albums = data;
						this.albums.sort((a, b) => a.albumId - b.albumId);
						this.albums.forEach(album => {
							album.photos.sort((a, b) => a.photoId - b.photoId);
						});
						this.selectedAlbum = this.albums[0];
					}
					else
						console.error(`Error: ${this.albumService.lastErrorResponseCode}`);
					this.busy.set(false);
				});
		} else {
			this.busy.set(false);
		}
	}

	selectImage(idx: number) {
		this.selectionIndex = idx;
	}

	selectChanged() {
		this.selectionIndex = 0;
	}
}
