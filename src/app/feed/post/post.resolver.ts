import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post/posts.service';



export const postResolver: ResolveFn<Post> = (route, _state) => {
  const postService = inject(PostService);
  const postId = route.paramMap.get('postId') || '';
  const router = inject(Router);

  return postService.getPostDetails(postId).pipe(
    catchError((error) => {
      router.navigate(['/']);
      console.error(error);

      return EMPTY;
    }),
  );
};
