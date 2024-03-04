import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';

@Component({
  selector: 'app-detail-tontine-gerant',
  templateUrl: './detail-tontine-gerant.component.html',
  styleUrls: ['./detail-tontine-gerant.component.css']
})
export class DetailTontineGerantComponent  implements OnInit{

  tontines:any;
  tontineChoisi:any;
  tontineStat: any;
  tontineTermine: any[]=[];
  tontineEnCours: any[]=[];

  constructor(private route: ActivatedRoute, private tontineService:TontineService, private authService:AuthService, private router:Router){}
  idTontineChoisi = this.route.snapshot.params['id'];
  dureeTontine:any;

  ngOnInit() {

    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      this.dureeTontine=this.calculerDureeTontine(this.tontineChoisi.periode,  this.tontineChoisi.nombre_participant,this.tontineChoisi.date_de_debut)
      console.log(this.tontineChoisi)
      

    })
    this.getTontineByUser();
    
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


  getTontineByUser(){ 
    const userConnect=JSON.parse(localStorage.getItem('userInfo')||'{}')
    this.tontineService.listeTontineByUsr(userConnect.id).subscribe((response:any)=>{
      this.tontineStat=response.data
      console.log('stat',this.tontineStat);
      this.tontineStat.forEach((element:any) => {
        if (element.etat === 'termine') {
            this.tontineTermine.push(element);
        }
    });
    
    console.log('term', this.tontineTermine);
    this.tontineStat.forEach((element:any) => {
      if (element.etat === 'en_cours') {
          this.tontineEnCours.push(element);
      }
  });
  
  console.log('cours', this.tontineEnCours);
    })
  }
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }
}
