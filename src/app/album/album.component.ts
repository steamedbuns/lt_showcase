import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { Album } from '../models/album';
import { AlbumApiService } from '../services/album-api.service';
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
  selector: 'app-album',
  imports: [FormsModule, MatFormFieldModule, MatProgressBarModule, MatSelectModule, MatInputModule, GalleryComponent],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
	private albumService = inject(AlbumApiService);

	busy = signal(false);
	albums = new Array<Album>;

	selectedAlbum: Album = this.albums[0];

	public ngOnInit(): void {
		this.busy.set(true);
		if (this.albums.length === 0) {
			this.albumService.getAllAlbums()
				.subscribe((data) => {
					this.albums = data;
					this.selectedAlbum = this.albums[0];
					this.busy.set(false);
				});
		} else {
			this.busy.set(false);
		}
	}
}
