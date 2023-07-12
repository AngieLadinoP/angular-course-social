import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';
import { User } from '../core/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngsocial-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private unsubscribe$ = new Subject<void>();

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  save() {
    if (this.loginForm.invalid) {
      return;
    }
    const userData = this.loginForm.value as User;
    this.authService
      .login(userData)
      .subscribe(() => console.log('login successful'));
  }
}
