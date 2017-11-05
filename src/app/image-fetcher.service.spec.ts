import { TestBed, inject } from '@angular/core/testing';
import { ImageFetcherService } from './image-fetcher.service';
import { Http, Response } from '@angular/http';
import { HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('ImageFetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageFetcherService],
      imports: [HttpModule],
    });
  });

  it('Image fetcher should be created', inject([ImageFetcherService], (service: ImageFetcherService) => {
    expect(service).toBeTruthy();
  }));
});
