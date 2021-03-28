import React from 'react';
import styles from './Home.module.scss';
import StandardFluidLayout from 'layout/StandardFluidLayout/StandardFluidLayout';
import Query from 'components/Query/Query';
import { getUsers } from 'graphql/queries';
import Users from 'components/Users/Users';
import { GraphQLNormalizr } from 'graphql-normalizr';
import produce from 'immer';
import { useUsersContext } from 'context/usersContext';
const { normalize } = new GraphQLNormalizr();

const Home = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(5);
  const { setUserData, setTotalCount } = useUsersContext();

  const queryOptions = React.useMemo(
    () => ({
      variables: { options: { paginate: { limit, page } } },
      onCompleted: resp => {
        const newResponse = produce(resp?.users, draft => {
          draft.data.forEach(user => {
            user.posts = user.posts.data;
            user.todos = user.todos.data;
          });
        });
        setUserData(normalize(newResponse));
        setTotalCount(newResponse.meta.totalCount);
      },
    }),
    [limit, page, setTotalCount, setUserData]
  );

  return (
    <StandardFluidLayout>
      <Query query={getUsers} {...{ queryOptions }}>
        {data => {
          return (
            <div className={styles.Home} data-testid='Home'>
              <Users pageChangeHandler={setPage} {...{ data, page, limit }} />
            </div>
          );
        }}
      </Query>
    </StandardFluidLayout>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
