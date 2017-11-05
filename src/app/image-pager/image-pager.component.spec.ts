import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ImagePagerComponent } from './image-pager.component';
import { ImageFetcherServiceMock } from '../image-fetcher-mock.service';
import { ImageFetcherService } from '../image-fetcher.service';
import { GifDetailsComponent } from '../gif-details/gif-details.component';
import { Observable } from 'rxjs/Observable';

describe('ImagePagerComponent', () => {
  let component: ImagePagerComponent;
  let fixture: ComponentFixture<ImagePagerComponent>;

  beforeEach(async(() => {
    this.imageFetcherMock = new ImageFetcherServiceMock();

    TestBed.configureTestingModule({
      declarations: [ ImagePagerComponent, GifDetailsComponent],
      providers:    [ {provide: ImageFetcherService, useValue: this.imageFetcherMock } ]
    })
    .compileComponents();

    spyOn(this.imageFetcherMock, 'getGifs').and.callThrough();

    fixture = TestBed.createComponent(ImagePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the pager compoment', () => {
    expect(component).toBeTruthy();
  });

  it('should add the images to the gifs array', () => {
    component.searchTerm = 'search term';
    component.getGifs();
    expect(component.gifs.length).toBe(2);
  });

  it('should call image fetcher with proper arguments', () => {
    component.searchTerm = 'search term';
    component.getGifs();
    expect(this.imageFetcherMock.getGifs).toHaveBeenCalledWith('search term', 0);
  });

  it('should call image fetcher with proper counter increased by 25 when next is called (25)', () => {
    component.searchTerm = 'search term';
    component.getGifs();
    component.fetchNext();
    expect(this.imageFetcherMock.getGifs.calls.count()).toBe(3);
    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 25);
  });

  it('should call image fetcher with proper counter increased by 25 when next is called (50)', () => {
    component.searchTerm = 'search term';
    component.getGifs();
    component.fetchNext();
    component.fetchNext();
    expect(this.imageFetcherMock.getGifs.calls.count()).toBe(4);
    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 50);
  });

  it('should call image fetcher with proper counter decreased by 25 when back is called (25)', () => {
    component.searchTerm = 'search term';
    component.fetchNext();
    component.fetchNext();
    expect(this.imageFetcherMock.getGifs.calls.count()).toBe(3);
    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 50);

    component.fetchPrevious();

    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 25);
  });

  it('should call image fetcher with proper counter decreased by 25 when back is called (0)', () => {
    component.searchTerm = 'search term';
    component.fetchNext();
    component.fetchNext();
    expect(this.imageFetcherMock.getGifs.calls.count()).toBe(3);
    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 50);

    component.fetchPrevious();
    component.fetchPrevious();

    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 0);
  });

  it('should call image fetcher with proper counter decreased by 25 when back is called but not less than 0', () => {
    component.searchTerm = 'search term';
    component.fetchPrevious();
    component.fetchPrevious();

    expect(this.imageFetcherMock.getGifs.calls.mostRecent().args).toContain('search term', 0);
  });

});
