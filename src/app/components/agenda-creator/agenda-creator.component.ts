import { Component, Input } from '@angular/core';

import { Agenda } from './../../classes/agenda';
import { AgendaService } from './../../services/agenda.service';

@Component({
  selector: 'agenda-creator',
  templateUrl: './agenda-creator.component.html',
  styleUrls: ['./agenda-creator.component.css']
})
export class AgendaCreatorComponent {
  title = "Create Agenda:"
  agenda: Agenda;
  @Input() agendas: Agenda[];
  @Input() active: boolean;

  constructor(private agendaService: AgendaService) { 
    this.agenda = {name:'', _id:'', color:'#dddddd', owner: ''};
  }

  onSubmit() {
    this.agendaService.create(this.agenda)
      .then(agenda => {console.log("agenda created"); this.agendas.push(agenda);})
      .catch(err => console.log(err));
  }

  onCancel() {
    this.active = false;
  }


}
