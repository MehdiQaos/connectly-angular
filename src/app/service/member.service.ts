import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { Observable } from 'rxjs';
import { Member, Profile } from '../model/Member';

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
    return this.httpClient.get<Profile>(url);
  }

  followMember(memberId: number, followerId: number): Observable<Profile> {
    const url = `${this.url}/${memberId}/follow/${followerId}`;
    return this.httpClient.get<Profile>(url);
  }

  unfollowMember(memberId: number, followerId: number) {
    const url = `${this.url}/${memberId}/unfollow/${followerId}`;
    return this.httpClient.get<Profile>(url);
  }

  isFollowing(memberId: number, followerId: number): Observable<boolean> {
    const url = `${this.url}/${memberId}/isFollowing/${followerId}`;
    return this.httpClient.post<boolean>(url, null);
  }

  updateProfile(profile: Profile, id: number): Observable<Profile> {
    const url = `${this.url}/${id}`;
    return this.httpClient.put<Profile>(url, profile);
  }

  updateEmail(email: string, id: number): Observable<Member> {
    const url = `${this.url}/${id}/email`;
    const params = new HttpParams().set('email', email);
    return this.httpClient.patch<Member>(url, null, { params });
  }

  updatePassword(oldPassword: string, newPassword: string, id: number): Observable<Member> {
    const url = `${this.url}/${id}/password`;
    const params = new HttpParams()
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);
    return this.httpClient.patch<Member>(url, null, { params });
  }

  updateProfilePicture(file: File, id: number): Observable<Member> {
    const url = `${this.url}/${id}/picture`;
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post<Member>(url, formData);
  }

  searchMembers(query: string): Observable<Profile[]> {
    const url = `${this.url}/search`;
    const params = new HttpParams().set('query', query);
    return this.httpClient.get<Profile[]>(url, { params });
  }
}
