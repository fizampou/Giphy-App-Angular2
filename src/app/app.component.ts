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
    errorMessage: String;
    isError: Boolean;
    giphies: Observable<Gif[]>;
    gifs: Gif[];
    imageFetcherService: ImageFetcherService;

    constructor(imageFetcherService: ImageFetcherService) {
      this.title = 'Giphy';
      this.imageFetcherService = imageFetcherService;
      this.gifs = [];
      this.isError = false;
      this.errorMessage = '';
    }

    performSearch(searchTerm: HTMLInputElement): void {
        this.giphies = this.imageFetcherService.getGifs(searchTerm.value);
        this.giphies.subscribe(
            gifs => {
                if (gifs.length === 0) {
                    this.isError = true;
                    return;
                }
                this.gifs = gifs;
                this.isError = false;
            },
            error => {
                this.errorMessage = error;
                this.isError = true;
            });
    }
}
