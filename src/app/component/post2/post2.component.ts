import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { Post } from 'src/app/model/Post';
import { CommentService } from 'src/app/service/comment.service';
import { ImageService } from 'src/app/service/image.service';
import { PostService } from 'src/app/service/post.service';
import { ReportService } from 'src/app/service/report.service';
import { StoreService } from 'src/app/service/store.service';
import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-post2',
  templateUrl: './post2.component.html',
  styleUrls: ['./post2.component.css']
})
export class Post2Component implements OnInit {
  @Input() post!: Post;
  @Output() delete = new EventEmitter<number>();

  isDropdownOpen = false;
  numOfLikes = 0;
  numOfComments: string | number = '';
  postId = 0;
  isLiked = false;
  imageUrl: string | null = null;
  profilePictureUrl: string | null = null;
  reportReason = '';

  showReportModal = false;
  showRemoveModal = false;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private imageService: ImageService,
    private store: StoreService,
    private reportService: ReportService,
  ) {

  }

  ngOnInit() {
    this.imageUrl = this.imageService.getImageUrl(this.post.imageLocation);
    this.profilePictureUrl = this.imageService.getImageUrl(this.post.member.profilePictureLocation);
    this.numOfLikes = this.post.likedMembers.length;
    this.isLiked = this.post.likedMembers.some((member) => member.id === 1);
    const id = this.post.id;
    if (id == null) return;
    this.commentService.getPostComments(id).subscribe({
      next: (data: CommentResponse[]) => {
        this.numOfComments = data.length;
      }
    })
  }

  like() {
    this.postService.likePost(this.store.user.id, this.post.id).subscribe({
      next: () => {
        this.numOfLikes += this.isLiked ? 0 : 1;
        this.isLiked = true;
      }
    });
  }

  unlike() {
    this.postService.unlikePost(this.store.user.id, this.post.id).subscribe({
      next: () => {
        this.numOfLikes -= this.isLiked ? 1 : 0;
        this.isLiked = false;
      }
    });
  }

  toggleReportModal() {
    this.showReportModal = !this.showReportModal;
  }

  toggleRemoveModal() {
    this.showRemoveModal = !this.showRemoveModal;
  }

  removePost() {
    this.postService.removePost(this.post.id).subscribe({
      next: () => {
        alertSuccess('Post removed successfully');
        this.toggleRemoveModal();
        this.delete.emit(this.post.id);
      },
      error: (error) => {
        console.log(error);
        alertFailure('Failed to remove post');
      }
    });
  }

  reportPost() {
    if (this.reportReason.trim() === '')
      return;
    const postId = this.post.id;
    const userId = this.store.user.id;
    const reason = this.reportReason;
    this.reportService.reportPost(postId, userId, reason).subscribe({
      next: () => {
        alertSuccess('Post reported successfully');
        this.toggleReportModal();
      },
      error: (error) => {
        console.log(error);
        alertFailure('Failed to report post');
      }
    });
  }
}
