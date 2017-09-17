import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../user.service';

@Injectable()
export class SearchService {

  constructor(private http: Http, private userService: UserService) { }

  searchBooks(term: string) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + term + '&maxResults=12').map(
      (res) => { 
        let result = (res.json().items).map(obj => {
          return {
            _id: obj.id, title: obj.volumeInfo.title, img: obj.volumeInfo.imageLinks.smallThumbnail, 
            isRequested: false, ownedBy: this.userService.userEmail
          }
        });
        return result; 
      }
    );
  }

}
