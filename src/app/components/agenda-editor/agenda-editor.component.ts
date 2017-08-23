import { Component, Input } from '@angular/core';

import { Agenda } from './../../classes/agenda';
import { AgendaService } from './../../services/agenda.service';

@Component({
  selector: 'agenda-editor',
  templateUrl: './agenda-editor.component.html',
  styleUrls: ['./agenda-editor.component.css']
})
export class AgendaEditorComponent {
  @Input() title: string;
  @Input() agenda: Agenda;

  constructor(private agendaService: AgendaService) { }

  onSubmit() {
    if (this.agenda._id !== undefined){
      this.agendaService.update(this.agenda)
        .then(agenda => console.log("agenda updated"))
        .catch(err => console.log(err));
    }
  }
}
