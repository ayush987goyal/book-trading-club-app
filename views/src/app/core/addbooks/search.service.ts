import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchService {

  constructor(private http: Http) { }

  searchBooks(term: string) {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=' + term + '&maxResults=12').map(
      (res) => { 
        let result = (res.json().items).map(obj => {
          return {
            _id: obj.id, title: obj.volumeInfo.title, img: obj.volumeInfo.imageLinks.smallThumbnail, isRequested: false
          }
        });
        return result; 
      }
    );
  }

}
