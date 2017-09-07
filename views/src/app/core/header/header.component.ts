import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, OnChanges {

  isValid: boolean;
  userName: string;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.validityUpdated.subscribe(
      (obj: any) => {
        this.isValid = obj.isValid;
        this.userName = obj.userName;
      }
    );
    this.isValid = this.authService.isAuthenticated();
    this.userName = this.authService.userName;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("onChanges");
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    console.log("onDestroy");
  }

  onSignOut() {
    this.authService.onSignOut();
  }

}
