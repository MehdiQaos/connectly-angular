import { Component } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.css']
})
export class SearchPostComponent {
  query = '';
  posts: Post[] = [];

  constructor (
    private postService: PostService,
  ) {}

  onSearch(): void {
    this.postService.searchPosts(this.query).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}