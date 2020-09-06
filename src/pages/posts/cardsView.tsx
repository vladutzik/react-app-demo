import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, CardColumns, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Post } from '../../types/post';
import typicodesClient from '../../clients/typicode';
import { User } from '../../types/user';

const CardView = ({ post }: { post: Post }) => {
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (post.userId) {
      typicodesClient.getUser(post.userId).then(({ body }) => setUser(body));
    }
  }, [post.userId]);
  return (
    <Card body>
      <CardTitle>
        <h4>{post.title}</h4>
      </CardTitle>
      <CardSubtitle>
        by:{' '}
        {!!user && (
          <Link to={`/user/${user.id}`}>
            <b>{user.name}</b>
          </Link>
        )}
      </CardSubtitle>
      <Button
        style={{ marginTop: 15, float: 'right' }}
        color="primary"
        onClick={() => history.push(`/post/${post.id}`)}
      >
        Read
      </Button>
    </Card>
  );
};

const PostsCardView = ({ posts }: { posts: Post[] }) => {
  return (
    <CardColumns>
      {posts.map((post) => (
        <CardView post={post} />
      ))}
    </CardColumns>
  );
};

export default PostsCardView;
