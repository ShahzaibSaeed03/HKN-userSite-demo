import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { Router, RouterLink } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { KandyEyeSliderComponent } from "../kandy-eye-slider/kandy-eye-slider.component";

@Component({
  selector: 'app-all-news',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, KandyEyeSliderComponent],
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news: any[] = [];
  mainImage: string = ''; // Stores the first news image

  // newss = Array.from({ length: 48 }, (_, i) => ({
  //   image: `https://picsum.photos/300/200?random=${i + 1}`,
  //   title: `News Headline ${i + 1}: South Gabbard Calls Out Europe "Two-Faced Policies" Following Explosive Trump-Zelenskyy Showdown`,
  //   tag: `News`,
  //   time: `8 hours ago`,
  // }));

  constructor(private httpArticle:ArticleService , private router: Router) {}

   heading: string[] = [
    'Celebrity',
    'Latest Sports Highlights',
    'Breaking Tech Updates',
    'Trending Music Albums',
    'Exclusive Movie Trailers'
  ];



  getHeading(index: number): string {
    return this.heading[Math.floor(index / 8) % this.heading.length];
  }

setSelectedArticle(article: any) {
  this.httpArticle.setSelectedArticle(article);
}

   // Convert the published_at timestamp to a relative time
  getRelativeTime(publishedAt: string): string {
    const parsedDate = parseISO(publishedAt); // Parse the ISO 8601 string to a Date object
    return formatDistanceToNowStrict(parsedDate); // Get the relative time without "about"
  }


  ngOnInit(): void {
    this.getArticles();

  }

  
  private baseUrl = 'https://new.hardknocknews.tv/upload/media/posts';


  getArticles(): void {
    this.httpArticle.getArticle().subscribe({
      next: (response) => {
        console.log('API Response:', response);
  
        if (response && Array.isArray(response.posts)) {
          this.news = response.posts.map((post: any) => {
            const updatedThumb = post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null;
            console.log('Updated Thumb URL:', updatedThumb); // Debugging log
            return {
              ...post,
              thumb: updatedThumb,
              relativeTime: this.getRelativeTime(post.published_at), // Add relative time to each post

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
  
  
  getPost(type: string, slug: string, article: any) {
    this.httpArticle.getsinglepost(type, slug).subscribe(result => {
      this.httpArticle.setSelectedArticle(article);
  
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
