import React from 'react';
import PropTypes from 'prop-types';
import StandardFluidLayout from 'layout/StandardFluidLayout/StandardFluidLayout';
import Query from 'components/Query/Query';
import { getUser as query } from 'graphql/queries';
import UserEditComponent from 'components/UserEditComponent/UserEditComponent';

const UserEdit = ({
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
            <div data-testid='User'>
              <UserEditComponent {...user} />
            </div>
          );
        }}
      </Query>
    </StandardFluidLayout>
  );
};

UserEdit.propTypes = {};

UserEdit.defaultProps = {};

export default UserEdit;
