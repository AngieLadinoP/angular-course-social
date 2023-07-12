import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Post } from '../../models/post';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  readonly basePath = environment.api;

  create(post: Post): Observable<any> {
    return this.http.post<Post>(`${this.basePath}/post`, post);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.basePath}/post`).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getOne(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.basePath}/post/${id}`);
  }

  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.basePath}/post/${id}`);
  }

  update(id: string, body: Post): Observable<Post> {
    return this.http.put<Post>(`${this.basePath}/post/${id}`);
  }
}
