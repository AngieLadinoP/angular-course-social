import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostsComponent } from './post/post.component';
@NgModule({
  declarations: [FeedComponent,PostsComponent],
  imports: [CommonModule, FeedRoutingModule],
})
export class FeedModule {}
