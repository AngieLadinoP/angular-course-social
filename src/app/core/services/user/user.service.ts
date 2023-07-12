import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserStateService } from '../state/user-state.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  public get userState(): UserStateService {
    return this._userState;
  }
  public set userState(value: UserStateService) {
    this._userState = value;
  }

  constructor(private http: HttpClient, private _userState: UserStateService) {}

  readonly basePath = environment.api;

  getUserProfile(): Observable<Partial<User>> {
    return this.http
      .get<Partial<User>>(`${this.basePath}/user/profile`)
      .pipe(
        tap((user) =>
          this.userState.setUser(user._id || '', user.username || '')
        )
      );
  }
}
