import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-tontine-admin',
  templateUrl: './detail-tontine-admin.component.html',
  styleUrls: ['./detail-tontine-admin.component.css']
})
export class DetailTontineAdminComponent  implements OnInit{
  tontines:any;
  tontineChoisi:any;
  idUser: any;
  users: any;
  createur: any;

  constructor(private route: ActivatedRoute, private tontineService:TontineService, private userService:UserService, private authSercice:AuthService, private router:Router){}
  idTontineChoisi = this.route.snapshot.params['id'];
  dureeTontine:any;
  cagnotte:any;

  ngOnInit(): void {
  this. detailTontine();
  this.responsive();
  }
  detailTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      this.dureeTontine=this.calculerDureeTontine(this.tontineChoisi.periode,  this.tontineChoisi.nombre_participant,this.tontineChoisi.date_de_debut);
      this.idUser=this.tontineChoisi.user_id ;
      console.log(this.idUser );
      // recuperation des utilisateurs
      this.userService.getUsers().subscribe((response:any)=>{
        this.users=response.data
        console.log(this.users)
        this.createur = this.users.find((element: any) => element.id == this.idUser);
        console.log(this.users.find((element: any) => element.id == this.idUser))
  
      })
      console.log(this.tontineChoisi)

    })
  }

  DeconnexionAdmin(){
    this.authSercice.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])
    })
  }

  responsive(){
    // Sélection des éléments du DOM avec types
const menuOpen: HTMLButtonElement = document.getElementById('menu-open') as HTMLButtonElement;
const menuClose: HTMLButtonElement = document.getElementById('menu-close') as HTMLButtonElement;
const sideBar: HTMLElement = document.querySelector('.container .left-section') as HTMLElement;
const sidebarItems: NodeListOf<HTMLElement> = document.querySelectorAll('.container .left-section .sidebar .item');

// Gestion des événements avec types
menuOpen.addEventListener('click', () => {
  sideBar.style.top = '0';
});

menuClose.addEventListener('click', () => {
  sideBar.style.top = '-60vh';
});

// Gestion de l'élément actif avec types
let activeItem: HTMLElement | null = sidebarItems[0];

sidebarItems.forEach(element => {
  element.addEventListener('click', () => {
    if (activeItem) {
      activeItem.removeAttribute('id');
    }

    element.setAttribute('id', 'active');
    activeItem = element;
  });
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

  


}
