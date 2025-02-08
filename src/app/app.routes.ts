import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadComponent: () => {
			return import('./home/home.component').then((module) => module.HomeComponent)
		}
	},
	{
		path: 'albums',
		loadComponent: () => {
			return import('./album/album.component').then((module) => module.AlbumComponent)
		}
	},
	{
		path: 'all-photos',
		loadComponent: () => {
			return import('./all-photos/all-photos.component').then((module) => module.AllPhotosComponent)
		}
	}
];
