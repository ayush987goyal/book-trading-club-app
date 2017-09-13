import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { addUser, userById, updateUser, addBook, removeBook, allBooks } from './schemaDetails';
import { UserService } from './user.service';


@Injectable()
export class MongoService {

  constructor(private apollo: Apollo, private userService: UserService) { }

  getAllBooks() {
    return this.apollo.query({
      query: allBooks,
      fetchPolicy: 'network-only'
    });
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
        this.userService.setUserDetails(data.data['addUser'].name, data.data['addUser'].email, data.data['addUser']._id,
        data.data['addUser'].city, data.data['addUser'].state, data.data['addUser'].books);
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

  addBookToUser(userEmail: string, bookDetails: any) {
    return this.apollo.mutate({
      mutation: addBook,
      variables: {
        email: userEmail, _id: bookDetails._id, title: bookDetails.title,
        img: bookDetails.img, isRequested: bookDetails.isRequested
      }
    });
  }

  removeBookFromUser(userEmail: string, bookId: any) {
    return this.apollo.mutate({
      mutation: removeBook,
      variables: {
        email: userEmail,
        _id: bookId
      }
    });
  }

}
