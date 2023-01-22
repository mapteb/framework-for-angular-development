import { Component, OnInit } from '@angular/core';

/**
 * https://github.com/mapteb/framework-for-angular-development
 * This Angular component just loads the layout component
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {

  title = "A Framework for Angular Development";

  constructor() {
  }

  ngOnInit() { }
}
