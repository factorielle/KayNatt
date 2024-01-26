import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-tontine',
  templateUrl: './gestion-tontine.component.html',
  styleUrls: ['./gestion-tontine.component.css']
})
export class GestionTontineComponent implements OnInit{
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
