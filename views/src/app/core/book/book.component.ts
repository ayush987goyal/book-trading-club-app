import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() bookDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
