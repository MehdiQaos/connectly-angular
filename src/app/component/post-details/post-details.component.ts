import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/model/IComment';
import { Post } from 'src/app/model/Post';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  posts: Post[] = [];
  id: number;
  comments: IComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private postService: PostService,
    private commentService: CommentService
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
        this.posts.push(post);
      }
    });
  }

  loadComments() {
    if (this.id == 0) return;
    this.commentService.getPostComments(this.id).subscribe({
      next: (comments: IComment[]) => {
        this.comments = comments;
      }
    });
  }
}