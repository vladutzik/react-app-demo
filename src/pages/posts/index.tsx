import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import typicodeClient from '../../clients/typicode';
import PostsTableView from './tableView';
import PostsCardView from './cardsView';
import { Post } from '../../types/post';

const tabs = {
  tableView: 'tableView',
  cardView: 'cardView',
};

const Posts = () => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [activeTab, setActiveTab] = useState(tabs.tableView);

  useEffect(() => {
    typicodeClient.getPosts().then(setPosts);
  }, []);

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container>
      <Row style={{ marginTop: 20 }}>
        <Col>
          <Nav tabs style={{ marginBottom: 15 }}>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === tabs.tableView })}
                onClick={() => {
                  toggleTab(tabs.tableView);
                }}
              >
                Table View
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === tabs.cardView })}
                onClick={() => {
                  toggleTab(tabs.cardView);
                }}
              >
                Cards View
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId={tabs.tableView}>
              <PostsTableView posts={posts} />
            </TabPane>
            <TabPane tabId={tabs.cardView}>
              <PostsCardView posts={posts} />
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
