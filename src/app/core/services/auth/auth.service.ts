import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../user/user.service';
import { UserStateService } from '../state/user-state.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private userState: UserStateService,
    private router: Router
  ) {}

  readonly basePath = environment.api;
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.AUTH_TOKEN_KEY);
    }

    return null;
  }

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
    }
  }

  signup(userData: User): Observable<User> {
    return this.http.post<User>(`${this.basePath}/auth/signup`, userData);
  }

  login(userData: User): Observable<Partial<User>> {
    return this.http
      .post<TokenData>(`${this.basePath}/auth/login`, userData)
      .pipe(
        switchMap((tokenData) => {
          this.saveToken(tokenData.access_token);
          return this.userService.getUserProfile();
        })
      );
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.token;
    }

    return false;
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_TOKEN_KEY);
    }

    this.userState.clearUser();
    this.router.navigate(['/login']);
  }
}
