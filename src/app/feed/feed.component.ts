import { Component } from '@angular/core';
import { Post } from 'src/app/core/models/post';

@Component({
  selector: 'ngsocial-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  posts: Post[] = [
    {
      _id: '',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur laudantium vitae recusandae voluptate quis. Inventore dolorum blanditiis veniam, deleniti, nam dolore maxime consequatur iusto enim at placeat modi molestias nostrum.',
      date: new Date(),
    },
    {
      _id: '',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur laudantium vitae recusandae voluptate quis. Inventore dolorum blanditiis veniam, deleniti, nam dolore maxime consequatur iusto enim at placeat modi molestias nostrum.',
      date: new Date(),
    },
    {
      _id: '',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur laudantium vitae recusandae voluptate quis. Inventore dolorum blanditiis veniam, deleniti, nam dolore maxime consequatur iusto enim at placeat modi molestias nostrum.',
      date: new Date(),
    },
  ];
}
