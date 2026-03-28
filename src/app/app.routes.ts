import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PoliticasPrivacidadComponent } from './components/politicas-privacidad/politicas-privacidad.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'politicas-de-privacidad', component: PoliticasPrivacidadComponent },
	{ path: '**', redirectTo: '' }
];
