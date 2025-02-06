import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SecretService {

	private SECRET_KEY = 'album_api_key';
	constructor() { }

	// Set the api key
	public setKey(key: string): void {
		sessionStorage.setItem(this.SECRET_KEY, key);
	}
	// Get the api key
	public getKey(): string | null {
		return sessionStorage.getItem(this.SECRET_KEY);
	}
}
