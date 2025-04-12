import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommentComponent } from "../comment-control/comment/comment.component";
import { LikeDislikeComponent } from "../share/like-dislike/like-dislike.component";
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { MoreNewsComponent } from '../more-news/more-news.component';
import { TrandingNewsComponent } from "../tranding-news/tranding-news.component";

@Component({
  selector: 'app-video-news',
  imports: [CommonModule, CommentComponent, LikeDislikeComponent, MoreNewsComponent, TrandingNewsComponent],
  templateUrl: './video-news.component.html',
  styleUrl: './video-news.component.css'
})
export class VideoNewsComponent implements OnInit {
  article: any;
  thumbUrl: string | null = null;
  extraImageUrls: string[] = [];
  showPopup = false;
  tags: { id: number; name: string; slug: string; icon: string | null; color: string | null }[] = [];

  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if there's an article in localStorage
    const storedArticle = localStorage.getItem('selectedArticle');
    if (storedArticle) {
      // If there's an article in localStorage, parse it and use it
      this.article = JSON.parse(storedArticle);
  
      // Format the date for created_at and updated_at
      if (this.article.created_at) {
        this.article.formattedCreatedAt = this.formatDate(this.article.created_at);
        console.log('Formatted Created At:', this.article.formattedCreatedAt);  // Logs "March 22, 2025"
      }
      
      if (this.article.updated_at) {
        this.article.formattedUpdatedAt = this.formatDate(this.article.updated_at);
        console.log('Formatted Updated At:', this.article.formattedUpdatedAt);  // Logs "March 22, 2025"
      }
      
      // Assuming the video field contains the path '2025-03/11/video_1741680298'
      if (this.article.entries && this.article.entries[0]?.video) {
        const videoUrl = this.getVideoUrl(this.article.entries[0].video);  // Generate the video URL
        console.log('Formatted Video URL:', videoUrl);  // This will print the formatted video URL
      }
  
      // Handle other article data
      this.setExtraImages(this.article.entries);
      this.tags = this.article.tags;
      console.log(this.article);
    } else {
      // If there's no article in localStorage, fetch from the API
      this.route.params.subscribe(params => {
        this.articleService.getsinglepost(params['type'], params['slug']).subscribe(data => {
          this.article = data;
  
          // Format the date for created_at and updated_at
          if (data.created_at) {
            this.article.formattedCreatedAt = this.formatDate(data.created_at);
          }
  
          if (data.updated_at) {
            this.article.formattedUpdatedAt = this.formatDate(data.updated_at);
          }
  
          console.log(this.article);
  
          // Assuming the video field contains the path '2025-03/11/video_1741680298'
          if (data.entries && data.entries[0]?.video) {
            const videoUrl = this.getVideoUrl(data.entries[0].video);  // Generate the video URL
            console.log('Formatted Video URL:', videoUrl);  // This will print the formatted video URL
          }
  
          // Handle other article data
          this.setExtraImages(data.entries);
          this.tags = data.tags;
  
          // Save the article to localStorage for future use
          localStorage.setItem('selectedArticle', JSON.stringify(data));
        });
      });
    }
  }
  
  
  

  // Calculate the time difference in a human-readable format (e.g., "3 hours ago")
  // calculateTimeAgo(dateString: string): string {
  //   const now = new Date();
  //   const date = new Date(dateString);
    
  //   const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);
  //   const months = Math.floor(days / 30);
  //   const years = Math.floor(days / 365);
  
  //   // If the time difference is more than a year
  //   if (years > 0) {
  //     return `${years} year${years > 1 ? 's' : ''} ago`;
  //   }
  //   // If the time difference is more than a month but less than a year
  //   else if (months > 0) {
  //     return `${months} month${months > 1 ? 's' : ''} ago`;
  //   }
  //   // If the time difference is more than a day but less than 30 days
  //   else if (days > 0) {
  //     return `${days} day${days > 1 ? 's' : ''} ago`;
  //   }
  //   // If the time difference is more than an hour but less than a day
  //   else if (hours > 0) {
  //     return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  //   }
  //   // If the time difference is more than a minute but less than an hour
  //   else if (minutes > 0) {
  //     return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  //   }
  //   // If the time difference is less than a minute
  //   else {
  //     return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  //   }
  // }
  showDescription = false;  // Initially hidden


  getVideoUrl(videoPath: string): string {
    // Assuming videoPath is something like '2025-03/11/video_1741680298'
    const baseUrl = 'https://new.hardknocknews.tv/';
  
    // Format the URL to match the desired pattern
    const formattedUrl = `${baseUrl}${videoPath}`;
    console.log(formattedUrl)
  
    return formattedUrl;
  }
  
  
  

  setExtraImages(entries: any[]) {
    if (!entries || entries.length === 0) return;

    entries.forEach((entry: any) => {
      // if (entry.type === 'image' && entry.image) {
      //   const imageUrl = this.setImageUrl(entry.image);
      //   this.extraImageUrls.push(imageUrl);
      // }
    });
  }

  setImageUrl(image: string) {
    // if (!image) return '';
    
    // const cleanImage = image.replace(/(-s|-m|-l)?\.jpg$/, '');
    // return cleanImage.startsWith('http')
    //   ? `${cleanImage}-s.jpg`
    //   : `${this.baseUrl}/${cleanImage}-s.jpg`;
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
    this.showPopup
      ? this.renderer.addClass(document.body, 'blur-bg')
      : this.renderer.removeClass(document.body, 'blur-bg');
  }

  @HostListener('document:click', ['$event'])
  closePopup(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup-container') && !target.closest('.share-btn')) {
      this.showPopup = false;
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }
  
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
  
    // Parse the date string into a Date object, ensuring it handles both UTC and local time zones.
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return 'Invalid date';
    }
  
    return date.toLocaleDateString('en-US', options);
  }
  
  




}

