import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { User } from './../../classes/user';
import { UserService } from './../../services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submitted = false;
  failed = false;
  signForm: FormGroup;
  user = new User();

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    this.signForm = formBuilder.group({
      username: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirm_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    }, {validator: this.passwordConfirming});
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirm_password').value) {
        return {invalid: true};
    }
  }

  signup(user: User): void {
    this.userService
      .create(user)
      .then( user => console.log(user))
      .catch( error => { this.failed = true; console.log("error: " + error);} );
  }

  onSubmit(){
    this.submitted = true;
    this.failed = false;
    if (this.signForm.valid){
      this.user.username = this.signForm.get('username').value;
      this.user.name = this.signForm.get('name').value;
      this.user.password = this.signForm.get('password').value;
      this.user.email = this.signForm.get('email').value;
      this.signup(this.user);
    }
  }


}
