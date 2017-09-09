import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  errorMessage: string;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.errorUpdated.subscribe(
      (obj: any) => {
        if(obj.code === 'auth/user-not-found') {
          this.errorMessage = 'No user found corresponding to this email.'
        } else {
          this.errorMessage = 'The password is invalid!'
        }
      }
    );
  }

  onSubmit() {
    this.errorMessage = '';
    this.authService.onSignIn(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

}
