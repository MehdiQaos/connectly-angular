import { Injectable } from '@angular/core';
import { Member } from '../model/Member';
import { EnvService } from './env.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _userChange: BehaviorSubject<any> = new BehaviorSubject(null);
  public userChange = this._userChange.asObservable();

  constructor(
    private envService: EnvService,
    private http: HttpClient
  ) { }

  get user() {
    const rawUser = localStorage['user'];
    return rawUser ? JSON.parse(rawUser) : null;
  }

  setUser(user: Member | null) {
    localStorage.setItem('user', JSON.stringify(user));
    this._userChange.next(user);
  }

  clearUser() {
    localStorage.removeItem('user');
  }

  getAuthorities() {
    const rawAuthorties = localStorage['authorities'];
    return rawAuthorties ? JSON.parse(rawAuthorties) : [];
  }

  setAuthorities(authorities: string[]) {
    localStorage.setItem('authorities', JSON.stringify(authorities));
  }

  getAccessToken() {
    return localStorage['accessToken'];
  }

  setAccessToken(token: string | null) {
    if (token)
      localStorage.setItem('accessToken', token);
    else
      localStorage.removeItem('accessToken');
  }

  getRefreshToken() {
    return localStorage['refreshToken'];
  }

  setRefreshToken(token: string | null) {
    if (token)
      localStorage.setItem('refreshToken', token);
    else
      localStorage.removeItem('refreshToken');
  }

  public updateUser(email: string) {
    const url = this.envService.ApiUrl + `/members/email/${email}`;
    this.http.get(url).subscribe((res: any) => {
      this.setUser(res);
    });
  }

  isAuthenticated() {
    return localStorage['authenticated'] ? JSON.parse(localStorage['authenticated']) : false;
  }

  setAuthenticated(val: boolean) {
    localStorage.setItem('authenticated', JSON.stringify(val));
  }

  clearAuth() {
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setAuthorities([]);
    this.setAuthenticated(false);
    this.setUser(null);
  }
}