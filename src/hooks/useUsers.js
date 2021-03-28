import { getUsers } from 'graphql/queries';
import { client } from 'lib/apollo-client';
import { useQuery } from 'react-query';

export const useUsers = (queryOptions = {}, variableOptions = {}) => {
  return useQuery(
    'users',
    async () => {
      const {
        data: { users },
      } = await client.query({
        query: getUsers,
        variables: {
          options: variableOptions,
        },
      });
      return users;
    },
    queryOptions
  );
};
