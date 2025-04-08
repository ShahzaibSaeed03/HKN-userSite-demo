import { Component } from '@angular/core';
import { WriteCommentComponent } from "../write-comment/write-comment.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [WriteCommentComponent,CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  replyingTo: number | null = null;

  toggleReply(commentId: number) {
    this.replyingTo = this.replyingTo === commentId ? null : commentId;
  }

  postReply(commentId: number) {
    console.log("Reply posted to comment", commentId);
    this.replyingTo = null; // Hide input after posting
  }
}
