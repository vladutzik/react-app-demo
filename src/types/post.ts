import { useReducer } from 'react';
import { Comment } from './comment';
import { User } from './user';
export interface Post {
  id?: number;
  userId?: number;
  title?: string;
  body?: string;
  comments?: Comment[];
  user?: User;
}
