import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/Member';
import { Post } from 'src/app/model/Post';
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
  // selectedTab: 'TIMELINE' | 'FOLLOWINGS' | 'OWN' | 'SUGGESTIONS' = 'TIMELINE';

  constructor(
    private postSetvice: PostService,
    private storeService: StoreService,
  ) {
    this.user = this.storeService.user;
  }

  ngOnInit() {
    const id = this.user.id;
    this.postSetvice.getFollowingPosts(id).subscribe((posts: Post[]) => {
      if (posts.length === 0) {
        this.loadSuggestionPosts();
        return;
      }
      this.posts = posts;
    });
  }

  loadFollowingsPosts() {
    const id = this.user.id;
    this.postSetvice.getFollowingPosts(id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  loadTimeLinePosts() {
    const id = this.user.id;
    this.postSetvice.getTimeLinePosts(id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  loadOwnPosts() {
    const id = this.user.id;
    this.postSetvice.getMemberPosts(id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  loadSuggestionPosts() {
    const id = this.user.id;
    this.postSetvice.getSuggestions(id).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onPostDelete(postId: number) {
    console.log('Post deleted id: ', postId);
    this.loadFollowingsPosts();
  }
}