import { Component, HostBinding, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SecretService } from '../services/secret.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FormsModule]
})
export class HomeComponent {
	private router = inject(Router);
	private secretService = inject(SecretService);
	private flashlightOn: boolean = false;
	secretApiKey = signal(this.secretService.getKey());

	@HostBinding('style.--radius') radius: string = '0px';
	@HostBinding('style.--mouse-x') xPos: string = '0px';
	@HostBinding('style.--mouse-y') yPos: string = '0px';
	@HostBinding('style.--cursor') cursor: string = 'none';

	onMouseMove(event: { clientX: any; clientY: any; }) {
		this.xPos = `${event.clientX}px`;
		this.yPos = `${event.clientY}px`;
	}

	onClick() {
		this.flashlightOn = !this.flashlightOn;
		this.radius = this.flashlightOn ? '250px' : '0px';
		this.cursor = this.flashlightOn ? 'auto' : 'none';
	}

	onInputClick(event: MouseEvent) {
		event.stopPropagation();
	}

	onButtonClick(event: MouseEvent) {
		this.secretService.setKey(this.secretApiKey());
		this.router.navigate(['/albums']);
		event.stopPropagation();
	}
}
