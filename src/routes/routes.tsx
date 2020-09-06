import React from 'react';
import Posts from '../pages/posts';
import Post from '../pages/post';
import User from '../pages/user';

export default [
  {
    path: '/post/:id',
    Component: (props: Record<any, any>) => <Post {...props} />,
  },
  {
    path: '/user/:userId',
    Component: (props: Record<any, any>) => <User {...props} />,
  },
  {
    path: '/',
    Component: (props: Record<any, any>) => <Posts {...props} />,
  },
];
