import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { LikeServiceService } from '../service/like-service.service';

@Component({
  selector: 'app-like-dislike',
  imports: [CommonModule],
  templateUrl: './like-dislike.component.html',
  styleUrl: './like-dislike.component.css'
})
export class LikeDislikeComponent implements OnInit {
showPopup = false;
article: any;
reactions: any[] = []; // This would be replaced with your actual data
selectedReactionIcon: string | null = null;



  constructor(
    private renderer: Renderer2,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private LikeServiceHttp:LikeServiceService
  ) {}

  ngOnInit(): void {
    this.article = this.articleService.getSelectedArticle();
  
    this.getLike();
    if (this.article) {
      // Check if reactions exist and if it's an array
      if (this.article.reactions && Array.isArray(this.article.reactions)) {
        console.log('Reactions length:', this.article.reactions.length);
      }
    } else {
      this.route.params.subscribe(params => {
        this.articleService.getsinglepost(params['type'], params['slug']).subscribe(data => {
          this.article = data;
  
          // Assuming reactions are in data.reactions
          if (this.article.reactions && Array.isArray(this.article.reactions)) {
            console.log('Reactions length:', this.article.reactions.length);
          }
        });
      });
    }
  }
  




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
  
    // Check if the click is outside the popup, share button, or like area
    if (
      !target.closest('.popup-container') &&
      !target.closest('.share-btn') &&
      !target.closest('.like-dislike')
    ) {
      this.showPopup = false;
      this.showReactions = false; // 👈 Hide reactions too
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

showReactions = false;

addLike(): void {
  this.liked = true;
  this.disliked = false;
  this.showReactions = true; // Show the reactions bar
}

sendReaction(reactionType: string): void {
  const userId = localStorage.getItem('userId');
  const postId = this.article.id;

  const selected = this.reactions.find(r => r.reaction_type === reactionType);
  if (selected) {
    this.selectedReactionIcon = 'https://new.hardknocknews.tv' + selected.icon;

    // ✅ Save per-post reaction in localStorage
    const allReactions = JSON.parse(localStorage.getItem('postReactions') || '{}');
    allReactions[postId] = reactionType;
    localStorage.setItem('postReactions', JSON.stringify(allReactions));
  }

  const data = {
    user_id: userId,
    post_id: postId,
    reaction_type: reactionType
  };

  this.LikeServiceHttp.addReaction(data).subscribe(
    (res: any) => {
      console.log('Reaction sent successfully:', res);
      this.showReactions = false;
    },
    (err) => {
      console.error('Failed to add reaction:', err);
      alert('Error submitting reaction');
    }
  );
}







getLike(): void {
  this.LikeServiceHttp.getReaction().subscribe(
    (res: any) => {
      this.reactions = res.reactions;

      // ✅ Get stored reactions object
      const allReactions = JSON.parse(localStorage.getItem('postReactions') || '{}');
      const savedReaction = allReactions[this.article.id];

      if (savedReaction) {
        const selected = this.reactions.find(r => r.reaction_type === savedReaction);
        if (selected) {
          this.selectedReactionIcon = 'https://new.hardknocknews.tv' + selected.icon;
        }
      }
    },
    (err) => {
      console.error('Failed to get reaction:', err);
    }
  );
}




}
