import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kandy-eye-slider',
  imports: [CommonModule,RouterLink],
  templateUrl: './kandy-eye-slider.component.html',
  styleUrl: './kandy-eye-slider.component.css'
})
export class KandyEyeSliderComponent implements OnInit, OnDestroy {
  cards = Array.from({ length: 8 }, (_, i) => ({
    image: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `Headline: How a Stuffed Animal Became Her Go-To Therapy for Surviving Trump’s Presidency ${i + 1}`
  }));

  visibleCards = 5;
  currentIndex = 0;
  translateX = 0;
  autoSlideInterval: any;

  ngOnInit() {
    this.updateVisibleCards();
    this.startAutoSlide();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateVisibleCards();
  }

  updateVisibleCards() {
    const screenWidth = window.innerWidth;
    this.visibleCards = screenWidth <= 640 ? 2 : screenWidth <= 1024 ? 3 : 5;
    this.translateX = -(this.currentIndex * (100 / this.visibleCards));
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Auto-slide every 1 second
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  nextSlide() {
    if (this.currentIndex + this.visibleCards < this.cards.length) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Reset to the beginning when reaching the end
    }
    this.updateTranslateX();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.cards.length - this.visibleCards; // Move to the last set of slides
    }
    this.updateTranslateX();
  }

  updateTranslateX() {
    this.translateX = -(this.currentIndex * (100 / this.visibleCards));
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
