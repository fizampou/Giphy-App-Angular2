import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title: String;
    inputValue: String;

    constructor() {
      this.title = 'Giphy';
      this.inputValue = '';
    }

    performSearch(searchTerm: HTMLInputElement): void {
        this.inputValue = searchTerm.value;
    }
}
