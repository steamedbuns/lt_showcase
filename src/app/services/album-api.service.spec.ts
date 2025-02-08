import { TestBed } from '@angular/core/testing';
import { AlbumApiService } from './album-api.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Album } from '../models/album';
import { Photo } from '../models/photo';

function getTestPhoto(len: number): Array<Photo> {
	let result: Array<Photo> = new Array<Photo>(len);
	for(let i = 0; i < len; ++i) {
		result[i] = {photoId: i, url: 'fake/url', albumId: i, title: `fake title ${i}`};
	}
	return result;
}

function getTestAlbum(len: number): Array<Album> {
	let result: Array<Album> = new Array<Album>(len);
	for(let i = 0; i < len; ++i) {
		result[i] = { albumId: i, photos: getTestPhoto(len)};
	}
	return result;
}

describe('AlbumApiService', () => {
	let httpTesting: HttpTestingController;
	let service: AlbumApiService;
	const ALBUM_URL = 'https://showcase.leantechniques.com/albums'

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

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('expect one album request', () => {
		service.getAllAlbums();
		let req = httpTesting.expectOne(ALBUM_URL);
		expect(req.request.method).toBe('GET');
	});

	it('multiple call single album request after cache', () => {
		let result = service.getAllAlbums();
		let req = httpTesting.expectOne(ALBUM_URL);

		expect(req.request.method).toBe('GET');

		const expected = getTestAlbum(1);
		req.flush(expected);

		result.subscribe((data) => expect(data).toEqual(expected));

		result = service.getAllAlbums();
		result = service.getAllAlbums();
		result = service.getAllAlbums();
		result = service.getAllAlbums();
		httpTesting.expectOne(ALBUM_URL);
	});

	it('expect one album request to get all photos', () => {
		let result = service.getAllPhotos(null);
		let req = httpTesting.expectOne(ALBUM_URL);

		expect(req.request.method).toBe('GET');

		const albums = getTestAlbum(1);
		const expected = albums.map(album => album.photos).reduce((photos, photo) => photos.concat(photo));
		req.flush(albums);

		result.subscribe((data) => expect(data).toEqual(expected));
	});

	it('all photos search string', () => {
		let result = service.getAllPhotos('fake title 0');
		let req = httpTesting.expectOne(ALBUM_URL);

		expect(req.request.method).toBe('GET');

		const albums = getTestAlbum(2);
		const expected = albums.map(album => album.photos).reduce((photos, photo) => photos.concat(photo));
		req.flush(albums);

		result.subscribe((data) => expect(data.length).toEqual(2));
	});
});
