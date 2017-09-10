import gql from 'graphql-tag';

export const addUser = gql`
mutation addUser($name: String!, $email: String!) {
  addUser(name: $name, email: $email) {
    _id
    name
    email
    books {
      _id
    }
  }
}
`;

export const userById = gql`
  query userById($email: String!) {
    userById(email: $email) {
      _id
      name
      city
      state
      books {
        _id
        title
      }
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($email: String!, $name: String!, $city: String!, $state: String!) {
      updateUser(email: $email, name: $name, city: $city, state: $state)
  }
`;