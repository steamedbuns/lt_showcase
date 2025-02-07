import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

@Injectable({
	providedIn: 'root'
})
export class AlbumApiService {
	private API_URL: string = 'https://showcase.leantechniques.com';
	private httpClient = inject(HttpClient);

	lastErrorResponseCode: number = 0;

	getAllAlbums(): Observable<Array<Album> | null> {
		return this.httpClient.get<Array<Album>>(this.API_URL + '/albums')
			.pipe(catchError(error => {
				this.lastErrorResponseCode = error.status;
				return of(null);
			}));
	}

	getAlbum(albumId: number): Observable<Album | null> {
		return this.httpClient.get<Album>(this.API_URL + `/albums/${albumId}`)
		.pipe(catchError(error => {
			this.lastErrorResponseCode = error.status;
			return of(null);
		}));
	}

	getPhoto(photoId: number): Observable<Photo | null> {
		return this.httpClient.get<Photo>(this.API_URL + `/photos/${photoId}`)
		.pipe(catchError(error => {
			this.lastErrorResponseCode = error.status;
			return of(null);
		}));
	}
}
