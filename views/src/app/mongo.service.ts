import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { addUser, userById, updateUser } from './schemaDetails';


@Injectable()
export class MongoService {

  userName: string = '';
  userEmail: string = '';
  userId: string = '';

  constructor(private apollo: Apollo) { }

  setUserDetails(name: string, email: string, id: string) {
    this.userName = name;
    this.userEmail = email;
    this.userId = id;
    console.log(this.userId);
  }

  unsetUserDetails() {
    this.userName = '';
    this.userEmail = '';
    this.userId = '';
  }

  addUserToMongo(userName: string, userEmail: string) {
    this.apollo.mutate({
      mutation: addUser,
      variables: {
        name: userName,
        email: userEmail
      }
    }).subscribe(
      (data) => {
        // console.log(data);
        this.setUserDetails(data.data['addUser'].name, data.data['addUser'].email, data.data['addUser']._id);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  getUserById(userEmail: string) {
    return this.apollo.query({
      query: userById,
      variables: {
        email: userEmail
      },
      fetchPolicy: 'network-only'
    });
  }

  updateUserDetails(userEmail: string, userName: string, userCity: string, userState: string) {
    return this.apollo.mutate({
      mutation: updateUser,
      variables: {
        email: userEmail, name: userName, city: userCity, state: userState
      }
    });
  }

}
