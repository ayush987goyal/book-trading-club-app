import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search.service';
import { MongoService } from '../../mongo.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbooks',
  templateUrl: './addbooks.component.html',
  styleUrls: ['./addbooks.component.css'],
  providers: [SearchService]
})
export class AddbooksComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  searchList: any[];
  isLoading: boolean = false;

  constructor(private searchService: SearchService, private mongoService: MongoService, private userService: UserService,
  private router: Router) { }

  ngOnInit() {
  }

  onSearch() {
    this.isLoading = true;
    this.searchService.searchBooks(this.form.value.term).subscribe(
      (res) => {
        this.searchList = res;
        // console.log(res);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  onAdd(index: number) {
    this.isLoading = true;
    this.mongoService.addBookToUser(this.userService.userEmail, this.searchList[index]).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/mybooks']);
        this.isLoading = false;
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

}
