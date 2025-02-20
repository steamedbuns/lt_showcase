import { TestBed } from '@angular/core/testing';

import { SecretService } from './secret.service';

describe('SecretService', () => {
	let service: SecretService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SecretService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('setter getter', () => {
		service.setKey('ASDF');
		expect(service.getKey()).toEqual('ASDF');
		service.setKey('');
		expect(service.getKey()).toEqual('');
	});
});
