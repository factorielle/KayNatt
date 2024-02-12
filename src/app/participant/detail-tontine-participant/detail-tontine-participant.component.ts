import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-tontine-participant',
  templateUrl: './detail-tontine-participant.component.html',
  styleUrls: ['./detail-tontine-participant.component.css']
})
export class DetailTontineParticipantComponent  implements OnInit{
  raison:string='';
  message:string='';
  
  tontineChoisi:any;
  tontines:any;
  users:any;
  createur:any;
  idUser: any;
  dureeTontine:any;

  constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute, private tontineService:TontineService, private userService:UserService){}
  idTontineChoisi = this.route.snapshot.params['id'];
  ngOnInit() {

      this.getTontine();

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
  signaler(){
    if(this.raison=='' || this.message==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }

  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
      confirmButtonColor: "#1E1E1E",
    })
  }
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      this.dureeTontine=this.calculerDureeTontine(this.tontineChoisi.periode,  this.tontineChoisi.nombre_participant)
      console.log(this.tontineChoisi);
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
  }

  calculerDureeTontine(typeTontine: any, nombreParticipants: number ) {
    // Convertir la date de début en timestamp
    
  
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

