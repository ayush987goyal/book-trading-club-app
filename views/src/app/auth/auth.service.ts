import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter, NgZone } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  isValid: boolean = false;
  userName: string = '';
  userEmail: string = '';
  token: string;

  validityUpdated = new Subject<{}>();

  constructor(private http: Http, private router: Router, private zone: NgZone) { }

  // onSignInFacebook() {
  //   firebase.auth().signInWithPopup(this.providerFacebook).then((result) => {
  //     this.token = result.credential.accessToken;
  //     this.userName = result.additionalUserInfo.profile.name;
  //     this.userEmail = result.additionalUserInfo.profile.email;
  //     // console.log(result.additionalUserInfo.profile);

  //     this.validityUpdated.next({
  //       isValid: this.isAuthenticated(),
  //       userName: this.userName,
  //       userEmail: this.userEmail
  //     });

  //     this.zone.run(() => {
  //       this.router.navigate(['']);
  //     })
  //   }).catch((error) => {
  //     alert(error.message);
  //     console.log(error);
  //   })
  // }

  onSignUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      (response) => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (tk: string) => { this.token = tk; }
        );
      }
    ).catch(
      (error) => { console.log(error); }
      );
  }

  onSignIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then(
          (tk: string) => { this.token = tk; }
        );
      }
    ).catch(
      (error) => { console.log(error); }
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
    this.userEmail = '';
    this.userName = '';
    this.validityUpdated.next({
      isValid: this.isAuthenticated(),
      userName: this.userName,
      userEmail: this.userEmail
    });

    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.token != null;
    // return true;
  }
}
