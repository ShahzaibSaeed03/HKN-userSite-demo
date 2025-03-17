import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { AllNewsComponent } from "../all-news/all-news.component";
import { TrendingNewsComponent } from '../trending-news/trending-news.component';

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, AllNewsComponent,TrendingNewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
