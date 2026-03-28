import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-politicas-privacidad',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './politicas-privacidad.component.html',
  styleUrl: './politicas-privacidad.component.css'
})
export class PoliticasPrivacidadComponent {
  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((current) => !current);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}