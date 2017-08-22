import { Component } from '@angular/core';
//import { Input } from '@angular/core';

import { User } from './../classes/user';
import { UserService } from './../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //@Input() user: User;
  submitted = false;
  failed = false;

  constructor(private userService: UserService) { }

  login(username: string, password: string): void {
    this.userService
      .getUser(username, password)
      .then( user => console.log(user))
      .catch( error => { this.failed = true; console.log("error: " + error);} );
  }

  onSubmit(){
    this.submitted = true;
  }
}
