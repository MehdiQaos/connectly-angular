import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Post } from '../model/Post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) { 
    this.url = envService.ApiUrl + "/posts"
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.url}/${id}`;
    return this.httpClient.get<Post>(url);
  }

  likePost(memberId: number, postId: number): Observable<Post> {
    const url = `${this.url}/${memberId}/like/${postId}`;
    return this.httpClient.post<Post>(url, null);
  }

  unlikePost(memberId: number, postId: number): Observable<Post> {
    const url = `${this.url}/${memberId}/unlike/${postId}`;
    return this.httpClient.post<Post>(url, null);
  }
}
