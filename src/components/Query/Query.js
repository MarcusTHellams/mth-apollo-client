import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/Spinner/Spinner';
import { useQuery } from '@apollo/client';

const Query = ({ children, queryOptions = {}, query }) => {
  const { loading, error, data } = useQuery(query, queryOptions);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return 'Error has occurred';
  }

  return <div>{children(data)}</div>;
};

Query.propTypes = {
  query: PropTypes.object.isRequired,
  queryOptions: PropTypes.object,
};

export default Query;
