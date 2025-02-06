import { Component, HostBinding, inject } from '@angular/core';
import { SecretService } from '../services/secret.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	private secretService = inject(SecretService);
	private flashlightOn: boolean = false;

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
		console.log(this.secretService.getKey());
		event.stopPropagation();
	}
}
