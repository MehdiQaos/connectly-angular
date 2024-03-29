import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { AuthService } from 'src/app/service/auth.service';
import { CommentService } from 'src/app/service/comment.service';
import { ImageService } from 'src/app/service/image.service';
import { StoreService } from 'src/app/service/store.service';
import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentResponse;
  @Output() deleteComment = new EventEmitter<number>();
  showRemoveModal = false;
  showDropDown = false;
  profilePictureUrl: string | null = null;

  constructor(
    private commentService: CommentService,
    public imageService: ImageService,
    private store: StoreService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.profilePictureUrl = this.imageService.getImageUrl(this.comment.member.profilePictureLocation);
  }

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

  isOwnOrIsAdmin() {
    return (this.comment.member.id === this.store.user.id) || this.auth.isAdmin();
  }
}
