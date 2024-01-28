import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-tontine',
  templateUrl: './detail-tontine.component.html',
  styleUrls: ['./detail-tontine.component.css']
})
export class DetailTontineComponent implements OnInit {
  nom:string='';
  prenom:string='';
  adresse:string='';
  telephone:string='';
  nin:string='';
  email:string='';
  numProche:string='';
  ngOnInit() {

  }

  integration(){
    if( this.telephone=='' || this.prenom=='' || this.nom=='' || this.adresse==''|| this.nin=='' || this.numProche=='' ||  this.email==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }
  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    })
  }
}
