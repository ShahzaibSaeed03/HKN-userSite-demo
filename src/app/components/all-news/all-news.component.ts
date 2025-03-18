import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselComponent } from '../carousel/carousel.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, CarouselComponent,RouterLink],
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {
  news = Array.from({ length: 48 }, (_, i) => ({
    image: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `News Headline ${i + 1}: South Gabbard Calls Out Europe "Two-Faced Policies" Following Explosive Trump-Zelenskyy Showdown`,
    tag: `News`,
    time: `8 hours ago`,
  }));

  constructor() {}

  ngOnInit(): void {}
}
