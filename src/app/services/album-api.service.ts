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

	// Get all albums from api.
	getAllAlbums(): Observable<Array<Album>> {
		return this.httpClient.get<Array<Album>>(this.API_URL + '/albums')
			.pipe(catchError(() => {
				return of(new Array<Album>);
			}));
	}

	// Get all albums and extract all photos as single array.
	getAllPhotos(): Observable<Array<Photo>> {
		return this.getAllAlbums().pipe(
			map(albums => albums.map(album => album.photos)
				.reduce((photos, photo) => photos.concat(photo)))
		);
	}

	// Implemented for completeness of api, but unused by application.
	getAlbum(albumId: number): Observable<Album | null> {
		return this.httpClient.get<Album>(this.API_URL + `/albums/${albumId}`)
		.pipe(catchError(() => {
			return of(null);
		}));
	}

	// Implemented for completeness of api, but unused by application.
	getPhoto(photoId: number): Observable<Photo | null> {
		return this.httpClient.get<Photo>(this.API_URL + `/photos/${photoId}`)
		.pipe(catchError(() => {
			return of(null);
		}));
	}
}
