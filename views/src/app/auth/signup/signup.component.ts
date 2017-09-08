import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  @ViewChild('f') form: NgForm;

  errorMessage: string;
  subscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
   this.subscription = this.authService.errorUpdated.subscribe(
      (obj: any) => {
        this.errorMessage = obj.message;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.errorMessage = '';
    this.authService.onSignUp(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

}
