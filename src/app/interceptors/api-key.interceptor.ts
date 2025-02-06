import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SecretService } from '../services/secret.service';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
	const secretService = inject(SecretService);
	const reqWithSecret = req.clone({
		headers: req.headers.set('lt_api_key', secretService.getKey())
	});
	return next(reqWithSecret);
};
