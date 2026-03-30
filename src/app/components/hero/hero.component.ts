import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, NgZone, afterNextRender } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface Slide {
  title1: string;
  title2: string;
  subtitle: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnDestroy {
  currentSlide = 0;
  private intervalId: any;
  private isBrowser: boolean;

  slides: Slide[] = [

    {
      title1: 'HIGH',
      title2: 'PERFORMANCE',
      subtitle: 'RESULTADOS COMPROBADOS',
      description: 'Más de 87% de efectividad en nuestros pronósticos. Únete a miles de miembros que ya están ganando con nosotros.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=900&fit=crop'
    },

  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Ejecutar después de la hidratación
    afterNextRender(() => {
      if (this.isBrowser) {
        this.startAutoSlide();
      }
    });
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    // Ejecutar fuera de la zona de Angular para no interferir con la hidratación
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 5000);
    });
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
