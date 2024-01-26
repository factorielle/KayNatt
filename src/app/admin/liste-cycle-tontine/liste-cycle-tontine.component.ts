import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-cycle-tontine',
  templateUrl: './liste-cycle-tontine.component.html',
  styleUrls: ['./liste-cycle-tontine.component.css']
})
export class ListeCycleTontineComponent implements OnInit {
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
