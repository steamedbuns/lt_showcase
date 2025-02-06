import { Component, HostBinding, WritableSignal, inject, signal } from '@angular/core';
import { SecretService } from './services/secret.service';
import { BaseHeaderComponent } from "./base-header/base-header.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
 	imports: [BaseHeaderComponent]
})
export class AppComponent {
	private secretService = inject(SecretService);

	currentKey: WritableSignal<string | null> = signal(this.secretService.getKey());

	@HostBinding('style.--radius') radius: string = '250px';
	@HostBinding('style.--mouse-x') xPos: string = '0px';
	@HostBinding('style.--mouse-y') yPos: string = '0px';

	onMouseMove(event: MouseEvent) {
		this.xPos = `${event.clientX}px`;
		this.yPos = `${event.clientY}px`;
	}
}
