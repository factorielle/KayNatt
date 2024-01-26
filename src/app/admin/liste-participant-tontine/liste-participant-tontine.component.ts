import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-participant-tontine',
  templateUrl: './liste-participant-tontine.component.html',
  styleUrls: ['./liste-participant-tontine.component.css']
})
export class ListeParticipantTontineComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
       this.dtOptions = {
      searching: true,
      lengthChange: true,
      paging: true,
      info: false,
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
  }

}
