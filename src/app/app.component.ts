import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public title: String;
    public inputValue: String;

    constructor() {
      this.title = 'Giphy';
      this.inputValue = '';
    }

    public performSearch(searchTerm: HTMLInputElement): void {
        this.inputValue = searchTerm.value;
    }
}
