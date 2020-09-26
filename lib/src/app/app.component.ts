import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent /*implements OnInit*/ {
  title = 'editor';

  // private layers: any[];
  // private response: Object;
  // constructor(private http: HttpClient) {
  //   this.layers = [];
  // }
  // ngOnInit() {
  //   this.http.get('http://localhost:4200/assets/data.json').subscribe((data) => {
  //     this.response = data;
  //   });
  // }
}
