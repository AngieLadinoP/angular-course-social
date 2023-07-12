import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../core/models/post';

@Component({
  selector: 'ngsocial-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() post: Post = {} as Post;

  ngOnInit(): void {}
}
