import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { Profile } from '../model/Member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  url: string;

  constructor(
    private httpClient: HttpClient,
    private envService: EnvService,
  ) {
    this.url = envService.ApiUrl + '/members';
  }

  getProfile(id: number): Observable<Profile> {
    const url = `${this.url}/profile/${id}`;
    console.log(url);
    return this.httpClient.get<Profile>(url);
  }
}
