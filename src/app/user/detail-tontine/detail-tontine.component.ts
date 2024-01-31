import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TontineService } from 'src/app/services/tontine.service';
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

  tontineChoisi:any;
  tontines:any;

  constructor(private route: ActivatedRoute, private router: Router, private tontineService:TontineService){}
  idTontineChoisi = this.route.snapshot.params['id'];
  ngOnInit() {
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      console.log(this.tontineChoisi )
    })
    
     console.log(this.tontines)
   
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
