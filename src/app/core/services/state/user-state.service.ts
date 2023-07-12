import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StateService } from './state.service';

interface UserState {
  userId: string;
  username: string;
}

const initialUserState: UserState = {
  userId: '',
  username: '',
};
@Injectable({
  providedIn: 'root',
})
export class UserStateService extends StateService<UserState> {
  userId$: Observable<string> | undefined = this.select(
    (state) => state.userId
  );
  username$: Observable<string> | undefined = this.select(
    (state) => state.username
  );

  constructor() {
    super(initialUserState);
  }

  setUser(userId: string, username: string): void {
    this.setState({ userId, username });
  }

  clearUser(): void {
    this.setState(initialUserState);
  }
}
