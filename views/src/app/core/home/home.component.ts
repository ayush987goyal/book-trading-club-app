import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
  }

  getUserName() {
    return this.userService.userName;
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
