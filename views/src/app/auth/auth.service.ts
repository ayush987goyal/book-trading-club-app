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
  providerGoogle = new firebase.auth.GoogleAuthProvider();
  providerGithub = new firebase.auth.GithubAuthProvider();
  providerTwitter = new firebase.auth.TwitterAuthProvider();
  providerFacebook = new firebase.auth.FacebookAuthProvider();
  token: string;

  validityUpdated = new Subject<{}>();

  constructor(private http: Http, private router: Router, private zone: NgZone) { }

  onSignInGoogle() {
    firebase.auth().signInWithPopup(this.providerGoogle).then((result) => {
      this.token = result.credential.accessToken;
      this.userName = result.additionalUserInfo.profile.name;
      this.userEmail = result.additionalUserInfo.profile.email;
      // console.log(result.additionalUserInfo.profile);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userName: this.userName,
        userEmail: this.userEmail
      });

      this.zone.run(() => {
        this.router.navigate(['']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
  }

  onSignInGithub() {
    firebase.auth().signInWithPopup(this.providerGithub).then((result) => {
      this.token = result.credential.accessToken;
      this.userName = result.additionalUserInfo.profile.name;
      this.userEmail = result.additionalUserInfo.profile.email;
      // console.log(result.additionalUserInfo);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userName: this.userName,
        userEmail: this.userEmail
      });

      this.zone.run(() => {
        this.router.navigate(['']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
  }

  onSignInTwitter() {
    firebase.auth().signInWithPopup(this.providerTwitter).then((result) => {
      this.token = result.credential.accessToken;
      this.userName = result.additionalUserInfo.profile.name;
      this.userEmail = result.additionalUserInfo.username;
      // console.log(result);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userName: this.userName,
        userEmail: this.userEmail
      });

      this.zone.run(() => {
        this.router.navigate(['']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
  }

  onSignInFacebook() {
    firebase.auth().signInWithPopup(this.providerFacebook).then((result) => {
      this.token = result.credential.accessToken;
      this.userName = result.additionalUserInfo.profile.name;
      this.userEmail = result.additionalUserInfo.profile.email;
      // console.log(result.additionalUserInfo.profile);

      this.validityUpdated.next({
        isValid: this.isAuthenticated(),
        userName: this.userName,
        userEmail: this.userEmail
      });

      this.zone.run(() => {
        this.router.navigate(['']);
      })
    }).catch((error) => {
      alert(error.message);
      console.log(error);
    })
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

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    return this.token != null;
    // return true;
  }
}
