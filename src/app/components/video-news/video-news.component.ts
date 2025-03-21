import { CommonModule } from '@angular/common';
import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-video-news',
  imports: [CommonModule],
  templateUrl: './video-news.component.html',
  styleUrl: './video-news.component.css'
})
export class VideoNewsComponent {

 showPopup = false;

  constructor(private renderer: Renderer2) {}

  togglePopup() {
    this.showPopup = !this.showPopup;
    if (this.showPopup) {
      this.renderer.addClass(document.body, 'blur-bg');
    } else {
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }
  showDescription = false;  // Initially hidden

  @HostListener('document:click', ['$event'])
  closePopup(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup-container') && !target.closest('.share-btn')) {
      this.showPopup = false;
      this.renderer.removeClass(document.body, 'blur-bg');
    }
  }


  liked: boolean = false;
disliked: boolean = false;

toggleLike() {
    this.liked = !this.liked;
    if (this.liked) {
        this.disliked = false; // Prevent both like and dislike from being active
    }
}

toggleDislike() {
    this.disliked = !this.disliked;
    if (this.disliked) {
        this.liked = false; // Prevent both like and dislike from being active
    }
}

}
