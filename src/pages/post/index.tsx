import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Table,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
} from 'reactstrap';
import typicodeClient from '../../clients/typicode';
import { Post } from '../../types/post';
import { Comment } from '../../types/comment';
import { User } from '../../types/user';

interface LoadingPost {
  isLoading: boolean;
}

const Posts = () => {
  const [post, setPost] = useState<Post | LoadingPost>({ isLoading: true });
  let { id: postId } = useParams<{ id: string }>();

  const loadingPost = post as LoadingPost;
  const loadedPost = post as Post;

  useEffect(() => {
    typicodeClient
      .getPost(parseInt(postId), { expand: 'user', embed: 'comments' })
      .then(setPost);
  }, [postId]);

  if (loadingPost.isLoading) {
    return (
      <Container style={{ paddingTop: 20 }}>
        <Row>
          <Col>
            <Progress striped animated color="info" value={100} />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem>
              <Link to="/">Posts</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              post
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{loadedPost.title}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>
            by:{' '}
            {!!loadedPost.user && (
              <Link to={`/user/${loadedPost.user.id}`}>
                {loadedPost.user.name}
              </Link>
            )}
          </h5>
        </Col>
      </Row>
      <Row>
        <Col>{loadedPost.body}</Col>
      </Row>

      <h3 style={{ marginTop: 50 }}> Comments: </h3>
      <hr />
      <Table striped>
        <tbody>
          {loadedPost.comments?.map((comment: Comment) => (
            <tr key={comment.id}>
              <td>
                <b>{comment.name}</b>
                <br />
                by {comment.email}
                <br />
                {comment.body}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Posts;
