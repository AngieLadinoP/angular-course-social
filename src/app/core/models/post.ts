import { User } from './user';

export interface Post {
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  author: User;
}
