import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { MongoService } from '../mongo.service';
import { UserService } from '../user.service';

@Injectable()
export class AuthService {

  isValid: boolean = false;
  token: string;

  errorUpdated = new Subject<{}>();

  constructor(private http: Http, private router: Router, private zone: NgZone, private mongoService: MongoService, private userService: UserService) { }

    onSignUp(name: string, email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (response) => {
        this.router.navigate(['/allbooks']);
        firebase.auth().currentUser.getIdToken().then(
          (tk: string) => { this.token = tk; }
        );
        this.mongoService.addUserToMongo(name, email);
      }
    ).catch(
      (error) => {
        // console.log(error);
        this.errorUpdated.next(error);
      }
      );
  }

  onSignIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.router.navigate(['/allbooks']);
        firebase.auth().currentUser.getIdToken().then(
          (tk: string) => { this.token = tk; }
        );
        this.userService.userEmail = email;
      }
    ).catch(
      (error) => {
        // console.log(error);
        this.errorUpdated.next(error);
      }
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (tk: string) => { this.token = tk }
    );
    return this.token;
  }

  onSignOut() {
    firebase.auth().signOut();
    this.token = null;
    this.userService.unsetUserDetails();

    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.token != null;
    // return true;
  }
}
