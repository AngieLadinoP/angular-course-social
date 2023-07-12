import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const postResolver: ResolveFn<boolean> = (route, state) => {
  const postService = inject(PostService);
  const postId = route.paramMap.get('postId') || '';

  return postService.getPostDetails(postId);
};
