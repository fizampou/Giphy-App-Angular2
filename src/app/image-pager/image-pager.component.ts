import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ImageFetcherService } from '../image-fetcher.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Gif } from '../gif';

@Component({
  selector: 'app-image-pager',
  templateUrl: './image-pager.component.html',
  styleUrls: ['./image-pager.component.scss']
})
export class ImagePagerComponent implements OnInit {
  private imageFetcherService: ImageFetcherService;
  private errorMessage: String;
  private giphies: Observable<Gif[]>;
  public gifs: Gif[];
  private _searchTerm = new BehaviorSubject<string>('');
  private imageCounter: number;

  @Input()
  set searchTerm(value) {
      this._searchTerm.next(value);
  }

  get searchTerm() {
      return this._searchTerm.getValue();
  }

  constructor(imageFetcherService: ImageFetcherService) {
    this.imageFetcherService = imageFetcherService;
    this.gifs = [];
    this.errorMessage = '';
    this.imageCounter = 0;
  }

  private calculateCounter(key) {
    switch (key) {
      case 'increase':
        return this.imageCounter += 25;
      case 'decrease':
        if (this.imageCounter >= 25) {
          return this.imageCounter -= 25;
        }
    }
  }

  public fetchNext() {
    this.fetchGifs(this.searchTerm, this.calculateCounter('increase'));
  }

  public fetchPrevious() {
    this.fetchGifs(this.searchTerm, this.calculateCounter('decrease'));
  }

  public ngOnInit() {
    this._searchTerm.subscribe(() => this.getGifs());
  }

  private fetchGifs(term: string, counter: number) {
    if (!term) {
      return;
    }
    this.giphies = this.imageFetcherService.getGifs(term, counter);
    this.giphies.subscribe(
      gifs => this.gifs = gifs,
      error => this.errorMessage = error);
  }

  public getGifs() {
    this.fetchGifs(this.searchTerm, this.imageCounter);
  }
}
