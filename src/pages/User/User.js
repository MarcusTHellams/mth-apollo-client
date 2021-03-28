import React from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.scss';
import StandardFluidLayout from 'layout/StandardFluidLayout/StandardFluidLayout';
import Query from 'components/Query/Query';
import { getUser as query } from 'graphql/queries';
import UserComponent from 'components/UserComponent/UserComponent';

const User = ({
  match: {
    params: { id },
  },
}) => {
  const queryOptions = React.useMemo(() => ({ variables: { id } }), [id]);

  return (
    <StandardFluidLayout>
      <Query  {...{queryOptions, query}}>
        {user => {
          return (
            <div className={styles.User} data-testid='User'>
              <UserComponent {...user} />
            </div>
          );
        }}
      </Query>
    </StandardFluidLayout>
  );
};

User.propTypes = {};

User.defaultProps = {};

export default User;
