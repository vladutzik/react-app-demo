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
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import classnames from 'classnames';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import typicodeClient, { QueryOptions } from '../../clients/typicode';
import PostsTableView from './tableView';
import PostsCardView from './cardsView';
import { Post } from '../../types/post';

const tabs = {
  tableView: 'tableView',
  cardView: 'cardView',
};

const Posts = () => {
  const history = useHistory();
  const [pagination, setPagination] = useState<Record<string, any>>({});
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [activeTab, setActiveTab] = useState(tabs.tableView);
  let { page: pageParam = '1', limit: limitParam = '10' } = useParams<{
    page: string;
    limit: string;
  }>();

  const currentPage = parseInt(pageParam);
  const pageIndex = currentPage - 1;
  const limit = parseInt(limitParam);

  const getPosts = async (options: QueryOptions) => {
    try {
      const { body, headers } = await typicodeClient.getPosts(options);
      if (options.limit && options.offset) {
        setPagination({
          total: Math.ceil(
            parseInt(headers['x-total-count']) / parseInt(options.limit)
          ),
          offset: options.offset,
          limit: options.limit,
        });
      }
      setPosts(body);
    } catch (error) {
      console.log('Silently catch error.', error);
    }
  };

  useEffect(() => {
    getPosts({ offset: `${pageIndex * limit}`, limit: `${limit}` });
  }, [pageIndex, limit]);

  const toggleTab = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const goToPage = (p: number) => () => history.push(`/${p}/${limit}`);
  const paginationComponent = pagination.total ? (
    <Pagination>
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink first onClick={goToPage(1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink previous onClick={goToPage(currentPage - 1)} />
      </PaginationItem>
      {[...Array(pagination.total)].map((i, ix) => (
        <PaginationItem key={ix} active={ix === pageIndex}>
          <PaginationLink onClick={goToPage(ix + 1)}>{ix + 1}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage >= pagination.total}>
        <PaginationLink next onClick={goToPage(currentPage + 1)} />
      </PaginationItem>
      <PaginationItem disabled={currentPage >= pagination.total}>
        <PaginationLink last onClick={goToPage(pagination.total)} />
      </PaginationItem>
    </Pagination>
  ) : null;

  if (currentPage > pagination.total) {
    return <Redirect to={`/${pagination.total}/${limit}`} />;
  }
  if (currentPage < 1) {
    return <Redirect to={`/1/${limit}`} />;
  }

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
          {paginationComponent}
        </Col>
      </Row>
    </Container>
  );
};

export default Posts;
