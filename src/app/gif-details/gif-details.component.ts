import { Component, Input } from '@angular/core';
import { Gif } from '../gif';

@Component({
  selector: 'app-gif-details',
  templateUrl: './gif-details.component.html',
  styleUrls: ['./gif-details.component.scss']
})
export class GifDetailsComponent {
  @Input() gif: Gif;
}
