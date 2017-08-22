import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './classes/user';

@Injectable()
export class UserService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private usersUrl = 'http://localhost:3000/user';  // URL to web api

  constructor(private http: Http) { };

  /*getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }*/
  
  get(username: string, password: string ): Promise<User> {
    const url = `${this.usersUrl}/${username}`;
    return this.http.get(url, {params: { 'password': password }})
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  create(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.username}`;
    return this.http.post(url, { 'password': user.password, 'email': user.email })
      .toPromise()
      .then(res => user)
      .catch(this.handleError);
  }
 
  /*delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
 
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }*/
 
  private handleError(error: any): Promise<any> {
    //console.error('An error occurred'); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
