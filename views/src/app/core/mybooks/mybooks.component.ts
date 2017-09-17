import { Component, OnInit } from '@angular/core';
import { MongoService } from '../../mongo.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {

  isLoading: boolean = false;
  myBooksList: any[];
  requestedBooksList: any[];
  approvalBooksList: string[];  

  constructor(private mongoService: MongoService, private userService: UserService) { }

  ngOnInit() {
    this.isLoading = true;
    this.mongoService.getUserById(this.userService.userEmail).subscribe(
      (data) => {
        // console.log(data.data['userById'].books);
        this.myBooksList = data.data['userById'].books;
        this.isLoading = false;
        this.approvalBooksList = data.data['userById'].pendingBooks;
        this.requestedBooksList = data.data['userById'].requestedBooks;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onRemove(index: number) {
    this.mongoService.removeBookFromUser(this.userService.userEmail, this.myBooksList[index]._id).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getBookFromId(id: string) {
    for(let book of this.myBooksList) {
      if(book._id === id) {
        return book.title;
      }
    }
  }

}
