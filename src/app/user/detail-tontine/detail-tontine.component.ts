import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
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
  users:any;
  createur:any;
  idUser: any;
  dureeTontine:any;

  constructor(private route: ActivatedRoute, private router: Router, private tontineService:TontineService, private userService:UserService){}
  idTontineChoisi = this.route.snapshot.params['id'];
  ngOnInit() {

    // recuperation des tontines
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      this.dureeTontine=this.calculerDureeTontine(this.tontineChoisi.periode,  this.tontineChoisi.nombre_participant,this.tontineChoisi.date_de_debut)
      console.log(this.tontineChoisi.user_id );
      this.idUser=this.tontineChoisi.user_id ;
      console.log(this.idUser );
      // recuperation des utilisateurs
      this.userService.getUsers().subscribe((response:any)=>{
        this.users=response.data
        console.log(this.users)
        this.createur = this.users.find((element: any) => element.id == this.idUser);
        console.log(this.users.find((element: any) => element.id == this.idUser))
  
      })
    })
    // console.log(this.idUser );
    
 
  }

   calculerDureeTontine(typeTontine: any, nombreParticipants: number, dateDebut: string | number | Date) {
    // Convertir la date de début en timestamp
    const timestampDebut = new Date(dateDebut).getTime();
  
    // Initialiser nombreParticipantsParPeriode avec une valeur de départ
    let nombreParticipantsParPeriode = 1;
  
    // Calculer le nombre de participants par période
    switch (typeTontine) {
      case "hebdomadaire":
        nombreParticipantsParPeriode = nombreParticipants / 7;
        break;
      case "mensuel":
        nombreParticipantsParPeriode = nombreParticipants / 30;
        break;
      case "annuel":
        nombreParticipantsParPeriode = nombreParticipants / 365;
        break;
      case "quotidien":
        nombreParticipantsParPeriode = nombreParticipants / 1;
        break;
      default:
        console.error("Type de tontine non reconnu :", typeTontine);
        return -1; // Ou une autre valeur par défaut ou un message d'erreur
    }
  
    // Vérifier si nombreParticipantsParPeriode est égal à zéro avant de faire la division
    if (nombreParticipantsParPeriode === 0) {
      console.error("La division par zéro est survenue.");
      return -1; // Ou une autre valeur par défaut ou un message d'erreur
    }
  
    // Calculer la durée de la tontine
    const duree = Math.ceil(nombreParticipants / nombreParticipantsParPeriode);
  
    return duree;
  }
  

  integration(tontine:any){
    const part={
      date:new Date().toISOString().split('T')[0],
      tontine_id:tontine.id
   }
   this.tontineService.IntegrerTontine(part).subscribe((response:any)=>{
    console.log(response)
    this.showMessage('success', 'Felicitation', `${response.status_message}`)
   })
  }
  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    })
  }

}
