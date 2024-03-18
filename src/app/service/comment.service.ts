import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { CommentRequest, CommentResponse } from '../model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService
  ) {
    this.url = envService.ApiUrl + "/comments"
  }

  getPostComments(id: number): Observable<CommentResponse[]> {
    const url = `${this.url}/post/${id}`;
    return this.httpClient.get<CommentResponse[]>(url);
  }

  addComment(comment: CommentRequest): Observable<CommentResponse> {
    return this.httpClient.post<CommentResponse>(this.url, comment);
  }
}
