import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthenticationService {
  //username: string;
  //password: string;
  //authenticated: boolean = false;

  constructor(private router: Router, private session: SessionStorageService) { }

  onLogin(username: string, password: string){
    this.storeCredentials(username, password);
    this.router.navigate(['/agendas']);
  }

  onLogout(){
    this.clearCredentials();
    this.router.navigate(['/login']);
  }

  storeCredentials(username: string, password: string){
    this.session.store('username', username);
    this.session.store('password', password);
    this.session.store('authenticated', true);
  }

  clearCredentials(){
    this.session.clear('username');
    this.session.clear('password');
    this.session.clear('authenticated');
  }

  logged() :boolean{
    if (this.session.retrieve('authenticated'))
      return true;
    else return false;
  }

  username() {
    return this.session.retrieve('username');
  }

  password() {
    return this.session.retrieve('password');
  }


}
