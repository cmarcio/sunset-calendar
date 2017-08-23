import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Agenda } from './../classes/agenda';
import { Credentials } from './../classes/credentials';
import { AuthenticationService } from './../services/authentication.service';

@Injectable()
export class AgendaService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private agendaUrl = 'http://localhost:3000/agenda';  // URL to web api

  constructor(private http: Http, private auth: AuthenticationService) { };

  get( ): Promise<Agenda[]> {
    const url = `${this.agendaUrl}/`;
    console.log("username: " + this.auth.username());
    return this.http.get(url, {params: { 'owner': this.auth.username(), 'password': this.auth.password() }})
      .toPromise()
      .then(response => response.json() as Agenda[])
      .catch(this.handleError);
  }

  update(agenda: Agenda): Promise<Agenda> {
    const url = `${this.agendaUrl}/${agenda._id}`;
    return this.http
      .put(url, { 'owner': this.auth.username(), 'password': this.auth.password(), 'color': agenda.color, 'name': agenda.name })
      .toPromise()
      .then((res) => res.json() as Agenda)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error('An error occurred'); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
