import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StateService } from './state.service';

interface UserState {
  userId: string;
}

const initialUserState: UserState = {
  userId: '',
};
@Injectable({
  providedIn: 'root',
})
export class UserStateService extends StateService<UserState> {
  userId$: Observable<string> | undefined = this.select(
    (state) => state.userId
  );

  constructor() {
    super(initialUserState);
  }

  setUserId(userId: string): void {
    this.setState({ userId });
  }
}
