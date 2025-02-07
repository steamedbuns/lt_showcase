import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
 	imports: [HomeComponent]
})
export class AppComponent {}
