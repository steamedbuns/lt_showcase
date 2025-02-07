import { Component, inject, signal } from '@angular/core';
import { Album } from '../models/album';
import { AlbumApiService } from '../services/album-api.service';

@Component({
  selector: 'app-album',
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {
	private albumService = inject(AlbumApiService);

	busy = signal(true);
	albums = signal(new Array<Album>);

	getAllALbums() {
		this.busy.set(true);
		this.albumService.getAllAlbums()
			.subscribe((data) => {
				if (data !== null)
					this.albums.set(data);
				else
					console.error(`Error: ${this.albumService.lastErrorResponseCode}`);
				this.busy.set(false);
			});
	}
}
