import { Component } from '@angular/core';
import { Post } from 'src/app/core/models/post.model';

@Component({
  selector: 'ngsocial-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  posts: Post[] = [];
}
