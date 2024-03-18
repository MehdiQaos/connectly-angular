import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { CommentRequest, IComment } from '../model/IComment';

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

  getPostComments(id: number): Observable<IComment[]> {
    const url = `${this.url}/post/${id}`;
    return this.httpClient.get<IComment[]>(url);
  }

  addComment(comment: CommentRequest): Observable<IComment> {
    return this.httpClient.post<IComment>(this.url, comment);
  }
}
