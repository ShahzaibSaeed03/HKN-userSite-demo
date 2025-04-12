import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseISO, formatDistanceToNowStrict } from 'date-fns';
import { ArticleService } from '../service/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-news',
  imports: [CommonModule],
  templateUrl: './more-news.component.html',
  styleUrl: './more-news.component.css'
})
export class MoreNewsComponent implements OnInit {

  news: any[] = [];
  mainImage: string = ''; // Stores the first news image

 

  constructor(private httpArticle:ArticleService , private router: Router) {}



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
            return {
              ...post,
              thumb: updatedThumb,
              relativeTime: this.getRelativeTime(post.spdate), // Add relative time to each post
            };
          });
  
          // Sort the news array by the spdate (latest date first)
          this.news.sort((a, b) => {
            const dateA = new Date(a.spdate).getTime();
            const dateB = new Date(b.spdate).getTime();
            return dateB - dateA; // Sort in descending order
          });
        } else {
          console.error('Invalid API response format:', response);
          this.news = [];
        }
      },
      error: (error) => console.error('Error fetching articles:', error),
    });
  }
  
  // getTranding(): void {
  //   this.httpArticle.getArticle().subscribe({
  //     next: (response) => {
  //       console.log('API Response:', response);
  
  //       if (response && Array.isArray(response.posts)) {
  //         let formattedPosts = response.posts.map((post: any) => {
  //           const updatedThumb = post.thumb ? `${this.baseUrl}/${post.thumb}-s.jpg` : null;
  //           return {
  //             ...post,
  //             thumb: updatedThumb,
  //             relativeTime: this.getRelativeTime(post.spdate),
  //             views: post.popularity_stats?.all_time_stats || 0 // fallback if null
  //           };
  //         });
  
  //         // Sort by views descending
  //         formattedPosts = formattedPosts.sort((a:any, b:any) => b.views - a.views);
  
  //         // Pick top 10 most viewed posts
  //         this.news = formattedPosts.slice(0, 10);
  //       } else {
  //         console.error('Invalid API response format:', response);
  //         this.news = [];
  //       }
  //     },
  //     error: (error) => console.error('Error fetching articles:', error),
  //   });
  // }
  
  
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
