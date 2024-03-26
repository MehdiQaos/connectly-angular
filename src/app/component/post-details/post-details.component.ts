import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentResponse } from 'src/app/model/Comment';
import { Post } from 'src/app/model/Post';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';

import { alertFailure, alertSuccess } from 'src/app/utils/Alerts-utils';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  posts: Post[] = [];
  id: number;
  comments: CommentResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.loadPost();
    this.loadComments();
  }

  loadPost() {
    this.postService.getPost(this.id).subscribe({
      next: (post: Post) => {
        this.posts = [post];
      },
    });
  }

  loadComments() {
    if (this.id == 0) return;
    this.commentService.getPostComments(this.id).subscribe({
      next: (comments: CommentResponse[]) => {
        this.comments = comments;
      },
    });
  }

  handleCommentAdded() {
    this.loadPost();
    this.loadComments();
    alertSuccess('Comment added successfully');
  }

  handleCommentNotAdded() {
    alertFailure('Comment could not be added');
  }

  onDeleteComment(commentId: number) {
    console.log('Comment deleted id:', commentId);
    this.loadPost();
    this.loadComments();
  }

  onPostDelete(postId: number) {
    console.log('Post deleted id: ', postId);
    this.router.navigate(['/posts']);
  }
}
