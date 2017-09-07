import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f) {
    this.authService.onSignIn(this.form.value.email, this.form.value.password);
    this.form.reset();
  }

}
