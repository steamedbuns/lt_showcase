import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, map, of, filter } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Injectable({
	providedIn: 'root'
})
export class AlbumApiService {
	private API_URL: string = 'https://showcase.leantechniques.com';
	private httpClient = inject(HttpClient);

	private albumCache: Array<Album> = new Array<Album>;
	private photoCache: Array<Photo> = new Array<Photo>;

	lastErrorResponseCode: number = 0;

	getAllAlbums(): Observable<Array<Album>> {
		if (this.albumCache.length > 0) {
			return of(this.albumCache);
		}
		let result = this.httpClient.get<Array<Album>>(this.API_URL + '/albums')
			.pipe(catchError(error => {
				this.lastErrorResponseCode = error.status;
				return of(new Array<Album>);
			}));
		result.subscribe((data: Array<Album>) => {
			this.albumCache = data;
		});
		return result;
	}

	getAllPhotos(searchString: string | null = null): Observable<Array<Photo>> {
		if (this.photoCache.length > 0) {
			return of(this.photoCache);
		}
		let result = this.getAllAlbums().pipe(
			map(albums => albums.map(album => album.photos)
				.reduce((photos, photo) => photos.concat(photo)))
		);
		if (searchString !== null)
			return result.pipe(map(photos => photos.filter(photo => photo.title.includes(searchString))));
		return result;
	}

	// Implemented for completeness of api, but unused by application.
	getAlbum(albumId: number): Observable<Album | null> {
		return this.httpClient.get<Album>(this.API_URL + `/albums/${albumId}`)
		.pipe(catchError(error => {
			this.lastErrorResponseCode = error.status;
			return of(null);
		}));
	}

	// Implemented for completeness of api, but unused by application.
	getPhoto(photoId: number): Observable<Photo | null> {
		return this.httpClient.get<Photo>(this.API_URL + `/photos/${photoId}`)
		.pipe(catchError(error => {
			this.lastErrorResponseCode = error.status;
			return of(null);
		}));
	}
}
