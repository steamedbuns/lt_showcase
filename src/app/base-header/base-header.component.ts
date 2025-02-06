import { Component, inject } from '@angular/core';
import { SecretService } from '../services/secret.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrl: './base-header.component.css'
})
export class BaseHeaderComponent {
	private secretService = inject(SecretService);

	onInputClick(event: MouseEvent) {
		event.stopPropagation();
	}

	onButtonClick(event: MouseEvent) {
		console.log(this.secretService.getKey());
		event.stopPropagation();
	}
}
