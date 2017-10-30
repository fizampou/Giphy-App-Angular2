import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ImageFetcherService } from './image-fetcher.service';
import { GifDetailsComponent } from './gif-details/gif-details.component';
import { ImagePagerComponent } from './image-pager/image-pager.component';

@NgModule({
  declarations: [
    AppComponent,
    GifDetailsComponent,
    ImagePagerComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    ImageFetcherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
