import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ImagePagerComponent } from './image-pager/image-pager.component';
import { GifDetailsComponent } from './gif-details/gif-details.component';
import { HttpModule } from '@angular/http';
import { ImageFetcherService } from './image-fetcher.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, ImagePagerComponent, GifDetailsComponent],
      imports: [BrowserModule, HttpModule],
      providers: [ImageFetcherService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Giphy'`, async(() => {
    expect(app.title).toEqual('Giphy');
  }));
  it('should pass input value to the inputValue property', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('input');
    input.value = 'some input';

    app.performSearch(input);

    expect(app.inputValue).toBe(input.value);
  }));
});
