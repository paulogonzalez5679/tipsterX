import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface CarouselImage {
  id: number;
  src: string;
  alt: string;
}

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrl: './description.component.css'
})
export class DescriptionComponent implements OnInit, OnDestroy {
  images: CarouselImage[] = [
    { id: 1, src: '/images/resultados/resultadoU.svg', alt: 'Resultado 1' },
    { id: 2, src: '/images/resultados/resultadoD.svg', alt: 'Resultado 2' },
    { id: 3, src: '/images/resultados/resultadoT.svg', alt: 'Resultado 3' },
    { id: 4, src: '/images/resultados/resultadoC.svg', alt: 'Resultado 4' }
  ];

  activeIndex = 0;
  private autoplayInterval: any;
  private autoplayDelay = 3000; // 3 segundos
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private ngZone: NgZone
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    if (this.isBrowser) {
      // Ejecutar fuera de la zona de Angular para no bloquear la hidratación
      this.ngZone.runOutsideAngular(() => {
        this.autoplayInterval = setInterval(() => {
          // Volver a entrar a la zona para actualizar la UI
          this.ngZone.run(() => {
            this.nextSlide();
          });
        }, this.autoplayDelay);
      });
    }
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  resetAutoplay() {
    this.stopAutoplay();
    this.startAutoplay();
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.images.length) % this.images.length;
    this.resetAutoplay();
  }

  goToSlide(index: number) {
    this.activeIndex = index;
    this.resetAutoplay();
  }

  getPrevIndex(offset: number = 1): number {
    return (this.activeIndex - offset + this.images.length) % this.images.length;
  }

  getNextIndex(offset: number = 1): number {
    return (this.activeIndex + offset) % this.images.length;
  }

  isVisible(index: number): boolean {
    const diff = Math.abs(index - this.activeIndex);
    const wrapDiff = this.images.length - diff;
    return diff <= 2 || wrapDiff <= 2;
  }
}
