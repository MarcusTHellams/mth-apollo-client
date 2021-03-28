import { gql } from '@apollo/client';

export const getUsers = gql`
  query GetUsers($options: PageQueryOptions!) {
    users(options: $options) {
      meta {
        totalCount
      }
      data {
        id
        name
        username
        email
        phone
        website
        company {
          name
        }
        posts {
          data {
            id
            title
            body
          }
        }
        todos{
          data{
            id
            title
            completed
          }
        }
        address {
          street
          city
          suite
          zipcode
          geo {
            lat
            lng
          }
        }
      }
      links {
        first {
          page
          limit
        }
        prev {
          page
          limit
        }
        next {
          page
          limit
        }
        last {
          page
          limit
        }
      }
    }
  }
`;

export const getUser = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
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
