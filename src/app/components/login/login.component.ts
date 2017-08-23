import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from './../../classes/user';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitted = false;
  failed = false;
  loginForm: FormGroup;

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  login(username: string, password: string): void {
    this.userService
      .get(username, password)
      .then( user => console.log(user))
      .catch( error => { this.failed = true; console.log("error: " + error);} );
  }

  onSubmit(){
    this.submitted = true;
    this.failed = false;
    if (this.loginForm.valid)
      this.login(this.loginForm.get('username').value, this.loginForm.get('password').value);
  }
}
