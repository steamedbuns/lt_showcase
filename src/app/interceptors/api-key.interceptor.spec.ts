import { TestBed } from '@angular/core/testing';
import { SecretService } from '../services/secret.service';
import { apiKeyInterceptor } from './api-key.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';

describe('ApiKeyInterceptor', () => {
	let secretService: SecretService;
	let httpTesting: HttpTestingController;
	let httpClient: HttpClient;

	const REQ_URL = 'https://any-url.test';

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideHttpClient(withInterceptors([apiKeyInterceptor])),
				provideHttpClientTesting()
			]
		});
		secretService = TestBed.inject(SecretService);
		httpTesting = TestBed.inject(HttpTestingController);
		httpClient = TestBed.inject(HttpClient);
	});

	it('should inject auth header', () => {
		const apiAuthHeaderKey = 'lt_api_key';
		const expected = 'test_auth_key';
		secretService.setKey(expected);

		httpClient.get(REQ_URL).subscribe();

		const req = httpTesting.expectOne(REQ_URL);
		expect(req.request.headers.get(apiAuthHeaderKey)).toEqual(expected);
	});
})
