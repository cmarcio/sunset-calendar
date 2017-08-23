import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newAgenda = false;
  agendaTitle = "My agendas";

  constructor() { }

  toggleView() {
    this.newAgenda = !this.newAgenda;
  }

  ngOnInit() {
  }

}
