import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MongoService } from '../../mongo.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  message: string;

  constructor(private mongoService: MongoService, private userService: UserService) { }

  ngOnInit() {
    this.mongoService.getUserById(this.userService.userEmail).subscribe(
      (data) => {
        // console.log(data);
        this.form.controls['name'].setValue(data.data['userById'].name);
        this.form.controls['city'].setValue(data.data['userById'].city);
        this.form.controls['state'].setValue(data.data['userById'].state);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
    this.mongoService.updateUserDetails(this.userService.userEmail, this.form.value.name,
      this.form.value.city, this.form.value.state).subscribe(
        (data) => {
          // console.log(data);
          this.message = 'Changes updated successfully';
        }
      );
  }

}
