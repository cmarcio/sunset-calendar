import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Sunset Calendar';
  //user: User;

  constructor() { }

  ngOnInit(): void {
    //this.userService.getUser().then(user => this.user = user);
  }
}
