import { gql } from '@apollo/client';

export const updateUser = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      username
      email
      address {
        street
        suite
        city
        zipcode
        geo {
          lat
          lng
        }
      }
      phone
      website
    }
  }
`;
