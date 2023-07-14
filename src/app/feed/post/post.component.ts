import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../core/models/post.model';
import { Subject, takeUntil } from 'rxjs';
import { CommentService } from 'src/app/core/services/comment/comment.service';

@Component({
  selector: 'ngsocial-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostsComponent {
  @Input() post: Post | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(private commentService: CommentService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveComment(text: string): void {
    if (this.post) {
      this.commentService
        .saveComment(text, this.post._id)
        ?.pipe(takeUntil(this.unsubscribe$))
        .subscribe();
    }
  }
}
