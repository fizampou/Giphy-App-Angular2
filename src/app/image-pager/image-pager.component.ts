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
  private gifs: Gif[];
  private _searchTerm = new BehaviorSubject<String>('');

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
  }

  ngOnInit() {
    this._searchTerm.subscribe(() => this.getGifs());
  }

  getGifs() {
    this.giphies = this.imageFetcherService.getGifs(this.searchTerm);
    this.giphies.subscribe(
      gifs => this.gifs = gifs,
      error => this.errorMessage = error);
  }
}
