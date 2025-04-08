import { Component } from '@angular/core';
import { CarouselComponent } from "../carousel/carousel.component";
import { AllNewsComponent } from "../all-news/all-news.component";
import { TrendingNewsComponent } from '../trending-news/trending-news.component';
import { KandyEyeSliderComponent } from "../kandy-eye-slider/kandy-eye-slider.component";

@Component({
  selector: 'app-home',
  imports: [CarouselComponent, AllNewsComponent,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
