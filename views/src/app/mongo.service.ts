import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const addUser = gql`
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

@Injectable()
export class MongoService {

  constructor(private apollo: Apollo) { }

  addUserToMongo(userName: string, userEmail: string) {
    this.apollo.mutate({
      mutation: addUser,
      variables: {
        name: userName,
        email: userEmail
      }
    }).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
      );
  }

}
