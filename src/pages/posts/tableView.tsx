import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Post } from '../../types/post';

const PostsTableView = ({ posts }: { posts: Post[] }) => {
  const history = useHistory();

  return (
    <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th>userId</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(({ id, userId, title }) => (
          <tr
            key={`post-${id}`}
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(`/post/${id}`)}
          >
            <td>{id}</td>
            <td>{userId}</td>
            <td>{title}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostsTableView;
