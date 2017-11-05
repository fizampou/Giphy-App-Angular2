import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Gif } from './gif';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

export class ImageFetcherServiceMock {
    public getGifs(searchTerm: string, counter: number): Observable<Gif[]> {
        const mockGifs = [{
            image: 'an image',
            description: 'image description'
        },
        {
            image: 'another image',
            description: 'another image description'
        }];
        return Observable.create(observer => {
            observer.next(mockGifs);
            observer.complete();
        });
    }
}
