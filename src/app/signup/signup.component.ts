import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';
import { User } from '../core/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngsocial-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private unsubscribe$ = new Subject<void>();

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  save() {
    if (this.signupForm.invalid) {
      return;
    }
    const userData = this.signupForm.value as User;
    this.authService.signup(userData).subscribe();
  }
}
