import { TestBed } from '@angular/core/testing';
import { AlbumApiService } from './album-api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Album } from '../models/album';
import { Photo } from '../models/photo';
import { firstValueFrom } from 'rxjs';

function getTestPhotos(len: number): Array<Photo> {
	let result: Array<Photo> = new Array<Photo>(len);
	for(let i = 0; i < len; ++i) {
		result[i] = {photoId: i, url: 'fake/url', albumId: i, title: `fake title ${i}`};
	}
	return result;
}

function getTestAlbums(len: number): Array<Album> {
	let result: Array<Album> = new Array<Album>(len);
	for(let i = 0; i < len; ++i) {
		result[i] = { albumId: i, photos: []};
	}
	return result;
}

describe('AlbumApiService', () => {
	let httpTesting: HttpTestingController;
	let service: AlbumApiService;
	const ALBUM_URL = 'https://showcase.leantechniques.com/albums';

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(),
				provideHttpClientTesting()
			]
		});
		httpTesting = TestBed.inject(HttpTestingController);
		service = TestBed.inject(AlbumApiService);
	});

	afterEach(() => {
		httpTesting.verify();
	})

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('get all album happy path', async () => {
		const result = service.getAllAlbums();
		const resultPromise = firstValueFrom(result);
		const req = httpTesting.expectOne({method: 'GET', url: ALBUM_URL});

		const expected = getTestAlbums(5);
		req.flush(expected);

		expect(await resultPromise).toEqual(expected);
	});

	it('get all album unauthorized empty result', async () => {
		const result = service.getAllAlbums();
		const resultPromise = firstValueFrom(result);
		const req = httpTesting.expectOne({method: 'GET', url: ALBUM_URL});

		const expected: Array<Album> = [];
		req.flush('{"message":"Forbidden"}', {status: 403, statusText: 'Forbidden'});

		expect(await resultPromise).toEqual(expected);
	});

	it('expect one album request when get all photos', async () => {
		const result = service.getAllPhotos();
		const resultPromise = firstValueFrom(result);
		const req = httpTesting.expectOne({method: 'GET', url: ALBUM_URL});

		const albums = getTestAlbums(10);
		for(let i = 0; i < albums.length; ++i) {
			albums[i].photos = getTestPhotos(5);
		}
		const expected = albums.map(album => album.photos).reduce((photos, photo) => photos.concat(photo));
		req.flush(albums);

		expect(await resultPromise).toEqual(expected);
	});
});
