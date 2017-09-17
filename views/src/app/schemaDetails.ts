import gql from 'graphql-tag';

export const allBooks = gql`
  query allBooks {
    allBooks {
      books {
        _id
        title
        img
        isRequested
        ownedBy
      }
    }
  }
`;

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
        img
        isRequested
        ownedBy
      }
      pendingBooks {
        _id
        requestedBy
      }
      requestedBooks {
        _id
        title
        img
        isRequested
        ownedBy
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
  mutation addBook($email: String!, $_id: ID!, $title: String!, $img: String!, $isRequested: Boolean!, $ownedBy: String!) {
    addBook(email: $email, _id: $_id, title: $title, img: $img, isRequested: $isRequested, ownedBy: $ownedBy)
  }
`;

export const removeBook = gql`
  mutation removeBook($email: String!, $_id: ID!) {
    removeBook(email: $email, _id: $_id)
  }
`;

export const updateRequestStatus = gql`
  mutation updateRequestStatus($_id: ID!, $status: Boolean!, $requestedBy: String!) {
    updateRequestStatus(_id: $_id, status: $status, requestedBy: $requestedBy) {
      _id
      title
      img
      isRequested
      ownedBy
    }
  }
`;

export const cancelRequest = gql`
  mutation cancelRequest($email: String!, $ownedBy: String!, $bookId: ID!) {
    cancelRequest(email: $email, ownedBy: $ownedBy, bookId: $bookId)
  }
`;

export const rejectPending = gql`
  mutation rejectPending($email: String!, $requestedBy: String!, $bookId: ID!) {
    rejectPending(email: $email, requestedBy: $requestedBy, bookId: $bookId)
  }
`;

export const approvePending = gql`
mutation approvePending($email: String!, $requestedBy: String!, $bookId: ID!) {
  approvePending(email: $email, requestedBy: $requestedBy, bookId: $bookId)
}
`;