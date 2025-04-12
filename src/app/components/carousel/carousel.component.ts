import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit {

  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';

    constructor(private httpArticle:ArticleService , private router: Router) {}
  
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

  newss: any[] = [];


  currentIndex = 0;
  interval: any;

  ngOnInit() {
    this.startAutoSlide();
    this.getArticles();
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


  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        console.log('API Response:', response);
  
        if (response && Array.isArray(response.posts)) {
          this.newss = response.posts.map((post: any) => {
            const updatedThumb = post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null;
            console.log('Updated Thumb URL:', updatedThumb); 
            return {
              ...post,
              thumb: updatedThumb,

            };
          });
        } else {
          console.error('Invalid API response format:', response);
          this.news = [];
        }
      },
      error: (error) => console.error('Error fetching articles:', error),
    });
  }

  stopAutoSlide() {
    clearInterval(this.interval);
  }


  getPost(type: string, slug: string, article: any) {
    // Clear the previously selected article from localStorage
    localStorage.removeItem('selectedArticle');
  
    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);
      localStorage.setItem('selectedArticle', JSON.stringify(article)); // Save the new article to localStorage
  
      // Navigate based on type, pass real values, not param names
      if (type === 'video') {
        this.router.navigate(['video-news', type, slug]);
      } else if (type === 'news') {
        this.router.navigate(['article', type, slug]);
      }
  
      console.log(result);
    });
  }
}