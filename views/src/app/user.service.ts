import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  userName: string = '';
  userEmail: string = '';
  userId: string = '';
  userCity: string = '';
  userState: string = '';
  userBooks: any;

  constructor() { }

  setUserDetails(name: string, email: string, id: string, city: string, state: string, books: any) {
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

}
