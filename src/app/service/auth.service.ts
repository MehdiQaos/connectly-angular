import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EnvService } from './env.service';
import { StoreService } from './store.service';
import { getPaylodFromToken, getUserFromToken } from '../utils/Token-utils';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  store: StoreService = inject(StoreService);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private envService: EnvService
  ) { }

    private getUser(email: string) {
    const url = this.envService.ApiUrl + `/member/email/${email}`;
    this.http.get(url, httpOptions).subscribe((res: any) => {
      console.log(res);
      this.store.setUser(res);
    });
  }

  login(form: any) {
    const url = this.envService.ApiUrl + "/auth/login";
    
    return this.http.post(url, { email: form.email, password: form.password });
  }

  register(form: any) {
    const url = this.envService.ApiUrl + "/auth/signup";

    return this.http.post(url, form, httpOptions);
  }

  processToken(res: any) {
    this.saveTokens(res);
    
    const email = getUserFromToken(res.accessToken);
    this.store.setAuthenticated(true);
    this.getUser(email);
    const payload = getPaylodFromToken(res.accessToken);
    const authorities = payload.authorities;
    
    this.store.setAuthorities(authorities);
    
    this.router.navigate(['/']);
  }

  private saveTokens(res: any) {
    this.store.setAccessToken(res.accessToken);
    this.store.setRefreshToken(res.refreshToken);
  }

  logout() {
    const url = this.envService.ApiUrl + "/auth/logout";
    
    this.http.post(url, {}, httpOptions).subscribe((res: any) => {
      this.store.clearAuth();
      this.router.navigate(['/login']);
    });
  }

  isAdmin() {
    return this.store.isAuthenticated() &&
      this.store.getAuthorities().includes('ROLE_ADMIN');
  }

  isJury() {
    return this.store.isAuthenticated() &&
      (this.store.getAuthorities().includes('ROLE_ADMIN') ||
      this.store.getAuthorities().includes('ROLE_JURY'));
  }

  isUser() {
    return this.store.isAuthenticated() &&
      (this.store.getAuthorities().includes('ROLE_ADMIN') ||
      this.store.getAuthorities().includes('ROLE_JURY') ||
      this.store.getAuthorities().includes('ROLE_USER'));
  }
}
