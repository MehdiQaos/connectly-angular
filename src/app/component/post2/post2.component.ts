import { Component, Input, OnInit } from '@angular/core';
import { CommentResponse } from 'src/app/model/Comment';
import { Post } from 'src/app/model/Post';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post2',
  templateUrl: './post2.component.html',
  styleUrls: ['./post2.component.css']
})
export class Post2Component implements OnInit {
  @Input() post!: Post;
  numOfLikes = 0;
  numOfComments = 20;
  postId = 0;
  isLiked = false;

  constructor(
    private commentService: CommentService,
    private postService: PostService
  ) {

  }

  ngOnInit() {
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
    this.postService.likePost(1, this.post.id).subscribe({
      next: () => {
        this.numOfLikes += this.isLiked ? 0 : 1;
        this.isLiked = true;
      }
    });
  }

  unlike() {
    this.postService.unlikePost(1, this.post.id).subscribe({
      next: () => {
        this.numOfLikes -= this.isLiked ? 1 : 0;
        this.isLiked = false;
      }
    });
  }
}
