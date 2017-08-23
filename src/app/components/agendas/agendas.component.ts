import { Component, OnInit } from '@angular/core';

import { Agenda } from './../../classes/agenda';

import { AgendaService } from './../../services/agenda.service'

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {
  agendas: Agenda[];
  selectedAgenda: Agenda;
  edit: string = 'Edit Agenda:';

  constructor(private agendaService: AgendaService) { }

  onDelete(agenda: Agenda) {
    console.log("delete: " + agenda.name);
  }

  onSelect(agenda: Agenda) {
    this.selectedAgenda = agenda;
  }

  ngOnInit() {
    this.agendaService.get()
      .then(agendas => this.agendas = agendas)
      .catch(error => console.log(error));
  }

}
