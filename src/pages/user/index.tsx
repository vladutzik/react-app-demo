import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import typicodeClient from '../../clients/typicode';
import { Post } from '../../types/post';
import { User } from '../../types/user';
import PostsCardView from '../posts/cardsView';

const Posts = () => {
  const [user, setUser] = useState<User | null>(null);
  let { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    typicodeClient.getUser(parseInt(userId), { embed: 'posts' }).then(setUser);
  }, [userId]);

  const randomProfilePictures = [
    'https://tinyfac.es/data/avatars/282A12CA-E0D7-4011-8BDD-1FAFAAB035F7-500w.jpeg',
    'https://tinyfac.es/data/avatars/B3CF5288-34B0-4A5E-9877-5965522529D6-500w.jpeg',
    'https://tinyfac.es/data/avatars/E0B4CAB3-F491-4322-BEF2-208B46748D4A-500w.jpeg',
    'https://tinyfac.es/data/avatars/344CFC24-61FB-426C-B3D1-CAD5BCBD3209-500w.jpeg',
    'https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-500w.jpeg',
    'https://tinyfac.es/data/avatars/1C4EEDC2-FE9C-40B3-A2C9-A038873EE692-500w.jpeg',
    'https://tinyfac.es/data/avatars/2DDDE973-40EC-4004-ABC0-73FD4CD6D042-500w.jpeg',
    'https://tinyfac.es/data/avatars/BA0CB1F2-8C79-4376-B13B-DD5FB8772537-500w.jpeg',
    'https://tinyfac.es/data/avatars/FBEBF655-4886-455A-A4A4-D62B77DD419B-500w.jpeg',
    'https://tinyfac.es/data/avatars/26CFEFB3-21C8-49FC-8C19-8E6A62B6D2E0-500w.jpeg',
    'https://tinyfac.es/data/avatars/852EC6E1-347C-4187-9D42-DF264CCF17BF-500w.jpeg',
    'https://tinyfac.es/data/avatars/03F55412-DE8A-4F83-AAA6-D67EE5CE48DA-500w.jpeg',
    'https://tinyfac.es/data/avatars/AEF44435-B547-4B84-A2AE-887DFAEE6DDF-500w.jpeg',
  ];

  if (!user) {
    return null;
  }

  return (
    <Container style={{ paddingTop: 20 }}>
      <Row>
        <Col>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem>
              <Link to="/">Posts</Link>
            </BreadcrumbItem>
            <BreadcrumbItem tag="span">Users</BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              {user.name}
            </BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
      <Row>
        <Col sm={3}>
          {user?.id && (
            <img
              alt="User profile"
              src={randomProfilePictures[user.id]}
              style={{ maxWidth: '100%' }}
              className="img-rounded"
            />
          )}
        </Col>
        <Col sm={4}>
          <p>{user.name}</p>
          <cite title="Source Title">
            {user.address?.street}, {user.address?.city}{' '}
            <i className="fa fa-map-marker"></i>
          </cite>
          <p>
            <i className="fa fa-envelope"></i> {user.email} <br />
            <i className="fa fa-globe"></i> {user.website} <br />
            <i className="fa fa-phone"></i> {user.phone}
          </p>
        </Col>
      </Row>
      {user.posts && (
        <Row style={{ marginTop: 30 }}>
          <Col>
            <h3>My posts: </h3>
            <hr />
            <PostsCardView posts={user.posts} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Posts;
