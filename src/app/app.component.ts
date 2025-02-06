import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	imports: [NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'lt-showcase';
	message = ''

	onClick() {
		this.message = 'Hello World'
	}
}
