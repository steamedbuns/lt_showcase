import { HttpClient } from '@angular/common/http';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-album',
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent {
	private httpClient = inject(HttpClient);

	albums: WritableSignal<Array<Album>> = signal([]);

	fetchAlbums() {
		this.httpClient.get<Array<Album>>('/albums').subscribe(this.gotAlbums);
	}

	gotAlbums(results: Array<Album>) {
		this.albums.set(results);
		console.log(results);
	}
}
