import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignOut() {
    this.authService.onSignOut();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
