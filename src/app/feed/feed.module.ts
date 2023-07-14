import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostsComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [FeedComponent, PostsComponent, PostDetailsComponent, PostFormComponent,],
  imports: [CommonModule, FeedRoutingModule,ReactiveFormsModule],
})
export class FeedModule {}
