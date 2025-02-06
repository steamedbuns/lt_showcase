import { Component, inject } from '@angular/core';
import { SecretService } from '../services/secret.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	private secretService = inject(SecretService);

	onInputClick(event: MouseEvent) {
		event.stopPropagation();
	}

	onButtonClick(event: MouseEvent) {
		console.log(this.secretService.getKey());
		event.stopPropagation();
	}
}
