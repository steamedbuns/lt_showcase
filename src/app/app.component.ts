import { Component, inject, signal, WritableSignal } from '@angular/core';
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

	title: string = 'lt-showcase';
	currentKey: WritableSignal<string | null> = signal(this.secretService.getKey());
}
