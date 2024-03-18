import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: IPost;
  numOfLikes = 20;

  ngOnInit() {
    this.numOfLikes = this.post.likedMembers.length;
  }
}
