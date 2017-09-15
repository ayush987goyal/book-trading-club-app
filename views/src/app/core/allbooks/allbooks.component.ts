import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../mongo.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent implements OnInit {

  isLoading: boolean = false;
  allBooksList: any[];

  constructor(private mongoService: MongoService, private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getAllBooks().subscribe(
      (data) => {
        // console.log(data);
        this.allBooksList = [];
        for(const item of data.data["allBooks"]) {
          Array.prototype.push.apply(this.allBooksList, item["books"]);
        }
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onRequest(index: number) {
    console.log(index);
  }

}
