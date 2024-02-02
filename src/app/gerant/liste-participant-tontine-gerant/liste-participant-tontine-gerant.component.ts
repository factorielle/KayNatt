import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-participant-tontine-gerant',
  templateUrl: './liste-participant-tontine-gerant.component.html',
  styleUrls: ['./liste-participant-tontine-gerant.component.css']
})
export class ListeParticipantTontineGerantComponent implements OnInit{
  users: any;

  constructor(private participantTontineService:TontineService, private route:ActivatedRoute , private userService:UserService){}
  idTontineChoisi=this.route.snapshot.params['id']
  nom:string='';
  prenom:string='';
  adresse:string='';
  telephone:string='';
  nin:string='';
  email:string='';
  numProche:string='';

  partTontine:any;

  // variable modal retirer
  raison:string='';
  message:string='';
  dtOptions: DataTables.Settings = {};
  ngOnInit(){
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

    this.getParticipantEnattente();
    this. getUserId();

    const menuToggle = document.getElementById("menu-toggle") as HTMLElement | null;

    // Attache un gestionnaire d'événements au clic de cet élément
    menuToggle?.addEventListener("click", (e: Event) => {
        // Empêche le comportement par défaut de l'événement de clic
        e.preventDefault();
    
        // Sélectionne l'élément avec l'ID "wrapper"
        const wrapper = document.getElementById("wrapper");
    
        // Alterne la classe "toggled" sur cet élément
        if (wrapper?.classList.contains("toggled")) {
            wrapper.classList.remove("toggled");
        } else {
            wrapper?.classList.add("toggled");
        }
    });
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
   
  getParticipantEnattente(){
    this.participantTontineService.listeParticipantEnAttente(this.idTontineChoisi).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontine=response.data;
    })
  }
  envoi(){
    if(this.raison=='' || this.message==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }

  getUserId(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
      // this.demandeur = this.users.find((element: any) => element.id == this.user_id);
      
  })
  }

}
