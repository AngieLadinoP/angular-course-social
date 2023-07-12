import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../user/user.service';

interface TokenData {
  access_token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private userService: UserService
  ) {}

  readonly basePath = environment.api;

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('ngsocial_auth_token');
    }

    return null;
  }

  signup(userData: User): Observable<User> {
    return this.http.post<User>(`${this.basePath}/auth/signup`, userData);
  }

  login(userData: User): Observable<TokenData> {
    return this.http
      .post<TokenData>(`${this.basePath}/auth/login`, userData)
      .pipe(
        tap((token) => {
          this.saveToken(token.access_token);
          this.userService.getUserProfile().subscribe();
        })
      );
  }

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.token;
    }

    return false;
  }
}
