import { HttpClient, HttpParams } from '@angular/common/http';
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

  getFollowingPosts(memberId: number): Observable<Post[]> {
    const url = `${this.url}/followings/${memberId}`;
    return this.httpClient.get<Post[]>(url);
  }

  getMemberPosts(memberId: number): Observable<Post[]> {
    const url = `${this.url}/member/${memberId}`;
    return this.httpClient.get<Post[]>(url);
  }

  createPost(memberId: number, formData: FormData): Observable<Post> {
    const url = `${this.url}/${memberId}`;
    return this.httpClient.post<Post>(url, formData);
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

  searchPosts(query: string): Observable<Post[]> {
    const url = `${this.url}/search`;
    const params = new HttpParams().set('query', query);
    return this.httpClient.get<Post[]>(url, { params });
  }

  removePost(postId: number): Observable<Post> {
    const url = `${this.url}/${postId}`;
    return this.httpClient.delete<Post>(url);
  }
}
