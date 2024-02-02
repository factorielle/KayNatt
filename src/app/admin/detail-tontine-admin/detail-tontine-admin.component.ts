import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TontineService } from 'src/app/services/tontine.service';

@Component({
  selector: 'app-detail-tontine-admin',
  templateUrl: './detail-tontine-admin.component.html',
  styleUrls: ['./detail-tontine-admin.component.css']
})
export class DetailTontineAdminComponent  implements OnInit{
  tontines:any;
  tontineChoisi:any;

  constructor(private route: ActivatedRoute, private tontineService:TontineService){}
  idTontineChoisi = this.route.snapshot.params['id'];
  dureeTontine:any;
  cagnotte:any;

  ngOnInit(): void {
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      this.dureeTontine=this.calculerDureeTontine(this.tontineChoisi.periode,  this.tontineChoisi.nombre_participant,this.tontineChoisi.date_de_debut);
      this.cagnotte=this.calculerMontantCagnotte(this.tontineChoisi.nombre_participant, this.tontineChoisi.montant)
      console.log(this.tontineChoisi)

    })
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

  calculerMontantCagnotte(mensualite: string, nombreParticipants: number) {
   
  
    // Calculer le montant total de la cagnotte
    const montantTotal =parseFloat(mensualite.trim().replace(/[^0-9.]/g, ""))  * nombreParticipants;
  
    return montantTotal;
  }


}
