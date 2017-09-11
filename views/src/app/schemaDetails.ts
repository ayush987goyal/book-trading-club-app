import gql from 'graphql-tag';

export const addUser = gql`
mutation addUser($name: String!, $email: String!) {
  addUser(name: $name, email: $email) {
    _id
    name
    email
    city
    state
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

export const addBook = gql`
  mutation addBook($email: String!, $_id: ID!, $title: String!, $img: String!, $isRequested: Boolean!) {
    addBook(email: $email, _id: $_id, title: $title, img: $img, isRequested: $isRequested)
  }
`;