import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/Member';
import { Post } from 'src/app/model/Post';
import { AuthService } from 'src/app/service/auth.service';
import { PostService } from 'src/app/service/post.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  user = new Member();

  constructor(
    private postSetvice: PostService,
    private storeService: StoreService,
  ) {
    this.user = this.storeService.user;
  }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const id = this.user.id;
    this.postSetvice.getFollowingPosts(id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}