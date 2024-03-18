import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentRequest } from 'src/app/model/IComment';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
  @Input() postId!: number;
  @Output() commentAdded = new EventEmitter<void>();
  content = '';

  constructor(
    private commentService: CommentService
  ) {}

  addComment(event: Event) {
    event.preventDefault();
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
      }
    });
  }
}
