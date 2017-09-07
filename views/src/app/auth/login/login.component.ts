import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onSignInGoogle() {
    this.authService.onSignInGoogle();
  }

  onSignInGithub() {
    this.authService.onSignInGithub();
  }

  onSignInTwitter() {
    this.authService.onSignInTwitter();
  }

  onSignInFacebook() {
    this.authService.onSignInFacebook();
  }

}
