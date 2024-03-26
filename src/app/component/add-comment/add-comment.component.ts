import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentRequest } from 'src/app/model/Comment';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<void>();
  @Output() commentNotAdded = new EventEmitter<void>();
  content = '';

  constructor(
    private commentService: CommentService
  ) {}

  addComment(event: Event) {
    event.preventDefault();
    if (this.content.trim() === '')
      return;

    const comment: CommentRequest = {
      content: this.content,
      postId: this.postId,
      memberId: 1
    };
    this.commentService.addComment(comment).subscribe({
      next: () => {
        this.content = '';
        console.log("comment added");
        this.commentAdded.emit();
      },
      error: () => {
        console.log("comment not added");
        this.commentNotAdded.emit();
      }
    });
  }
}
