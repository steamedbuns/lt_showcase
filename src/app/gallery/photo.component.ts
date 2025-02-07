import { Component, Input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  imports: [MatProgressSpinnerModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
	@Input({required: true}) photo!: Photo;
	@Input({required: true}) active!: boolean;

	busy = signal(true);
}
