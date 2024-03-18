import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  url = 'http://localhost:8080/api/posts/followings/1';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get<Post[]>(this.url).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
}