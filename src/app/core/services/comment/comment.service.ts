import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStateService } from '../state/user-state.service';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private userState: UserStateService) {}

  readonly basePath = environment.api;

  getCommentsByPost(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.basePath}/comment?postId=${postId}`
    );
  }

  saveComment(text: string, post: string): Observable<Comment> | undefined {
    return this.userState.userId$?.pipe(
      switchMap((author) =>
        this.http.post<Comment>(`${this.basePath}/comment`, {
          text,
          post,
          author,
        })
      )
    );
  }
}
