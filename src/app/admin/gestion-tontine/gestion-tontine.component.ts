import { Component, OnInit } from '@angular/core';
import { Tontine } from 'src/app/model/tontine';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';

@Component({
  selector: 'app-gestion-tontine',
  templateUrl: './gestion-tontine.component.html',
  styleUrls: ['./gestion-tontine.component.css']
})
export class GestionTontineComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  tontines:Tontine[]=[];

  constructor(private tontintService:TontineService, private logoutService:AuthService){}

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
    this.tontintService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data;
    console.log(this.tontines);
      
  })
  }

  AccepterTontine(tontine:any){
    this.tontintService.ApprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response)
    })
  }

  RefuserTontine(tontine:any){
    this.tontintService.DesapprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response)
    })
  }
   
  
 
}
