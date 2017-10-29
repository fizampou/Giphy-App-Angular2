import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title: String;
    link: String;
    http: Http;
    giphies: String[];

    constructor(http: Http) {
      this.title = 'The gify app';
      this.link = 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
      this.http = http;
      this.giphies = [];
    }

    performSearch(searchTerm: HTMLInputElement): void {
      // TODO add some checks
      const apiLink = this.link + searchTerm.value;

      this.http.request(apiLink)
          .subscribe((res: Response) => {
                this.giphies = res.json().data;
                console.log(this.giphies);
          });
    }
}
