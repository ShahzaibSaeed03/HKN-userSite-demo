import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {
  news = [
    {
      image: 'https://picsum.photos/600/300?random=1',
      title: 'Breaking News: Market Hits New Highs',
      tag:'business'
    },
    {
      image: 'https://picsum.photos/600/300?random=2',
      title: 'Tech Update: New Innovations in AI',
      tag:'Tech'

    },
    {
      image: 'https://picsum.photos/600/300?random=3',
      title: 'Sports: Championship Finals Excite Fans',
      tag:"Scinece"
    },
    {
      image: 'https://picsum.photos/600/300?random=4',
      title: 'Politics: Key Debates Before Elections',
      tag:'Politics'
    },
  ];

  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.news.length;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.news.length - 1 : this.currentIndex - 1;
  }

  startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  stopAutoSlide() {
    clearInterval(this.interval);
  }
}