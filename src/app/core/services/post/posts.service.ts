import { Injectable } from '@angular/core';
import { Observable, catchError, map, switchMap } from 'rxjs';
import { Post } from '../../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommentService } from '../comment/comment.service';
import { UserStateService } from '../state/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private http: HttpClient,
    private commentService: CommentService,
    private userState: UserStateService
  ) {}

  readonly basePath = environment.api;

  create(text: string): Observable<Post> | undefined {
    return this.userState.userId$?.pipe(
      switchMap((userId) =>
        this.http.post<Post>(`${this.basePath}/post`, {
          text,
          author: userId,
        })
      )
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.basePath}/post`).pipe(
      map((posts) => {
        posts.forEach((post) => {
          post.comments$ = this.commentService.getCommentsByPost(post._id);
        });

        return posts;
      })
    );
  }

  getOne(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/post/${id}`).pipe(
      map((post) => {
        post.comments$ = this.commentService.getCommentsByPost(post._id);

        return post;
      })
    );
  }

  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.basePath}/post/${id}`);
  }
}
