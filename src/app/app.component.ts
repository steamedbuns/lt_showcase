import { Component, HostBinding } from '@angular/core';
import { HomeComponent } from "./home/home.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
 	imports: [HomeComponent]
})
export class AppComponent {
	flashlightOn: boolean = false;

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
}
