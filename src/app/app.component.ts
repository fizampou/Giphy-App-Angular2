import { Component } from '@angular/core';
import { ImageFetcherService } from './image-fetcher.service';
import { Observable } from 'rxjs/Observable';
import { Gif } from './gif';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title: String;
    giphies: Observable<Gif[]>;
    gifs: Gif[];
    imageFetcherService: ImageFetcherService;

    constructor(imageFetcherService: ImageFetcherService) {
      this.title = 'The gify app';
      this.imageFetcherService = imageFetcherService;
      this.gifs = [];
    }

    performSearch(searchTerm: HTMLInputElement): void {
        this.giphies = this.imageFetcherService.getGifs(searchTerm.value);
        this.giphies.subscribe(
            gifs => this.gifs = gifs);
    }
}
