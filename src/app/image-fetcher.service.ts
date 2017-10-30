import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Gif } from './gif';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ImageFetcherService {
  http: Http;
  link: String;
  error: String;

  constructor(http: Http) {
    this.http = http;
    this.link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
    this.error = 'set your search term';
  }

  getGifs(searchTerm): Observable<Gif[]> {
    const apiLink = this.link + searchTerm;

    return this.http.get(apiLink)
        .map(this.extractGifs.bind(this))
        .catch((error) => this.handleError(error.message));
  }

  private extractGifs(res: Response) {
    const data = res.json().data;
    const gifs = [];

    data.forEach(element => {
      const gif = new Gif();

      gif.image = element.images.original.url;
      gif.description = element.title;

      gifs.push(gif);
    });

    return gifs;
  }

  private handleError (error: String) {
    return Observable.throw(error);
  }
}

