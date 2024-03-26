import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { CommentService } from 'src/app/service/comment.service';
import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment!: CommentResponse;
  @Output() deleteComment = new EventEmitter<number>();
  showRemoveModal = false;
  showDropDown = false;

  constructor(
    private commentService: CommentService,
  ) { }

  toggleRemoveModal() {
    this.showRemoveModal = !this.showRemoveModal;
    this.closeDropDown();
  }

  closeRemoveModal() {
    this.showRemoveModal = false;
  }

  openRemoveModal() {
    this.showRemoveModal = true;
    this.closeDropDown();
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  closeDropDown() {
    this.showDropDown = false;
  }

  openDropDown() {
    this.showDropDown = true;
  }

  removeComment() {
    this.commentService.deleteComment(this.comment.id).subscribe({
      next: () => {
        console.log('Comment removed');
        this.toggleRemoveModal();
        this.deleteComment.emit(this.comment.id);
        alertSuccess('Comment removed');
      },
      error: (error) => {
        alertFailure('There was an error!');
        console.error('There was an error!', error);
      }
    });
  }
}
