import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
  demandeur: any;
  tabParticipant:any[] = [];
  tabParticipantAccepter:any[] = [];
  tontineChoisi: any;
  partTontineAccepte: any;
  demandeurAccepter: any;
  details = { name: '', email: '', adresse: '', telephone:'' };

  constructor(private participantTontineService:TontineService, private route:ActivatedRoute , private userService:UserService, private tontineService:TontineService, private authService:AuthService, private router:Router){}
  idTontineChoisi=this.route.snapshot.params['id']
  // nom:string='';
  // prenom:string='';
  // adresse:string='';
  // telephone:string='';
  // nin:string='';
  // email:string='';
  // numProche:string='';

  showPartEnAttente:boolean=true;

  tontines:any;
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
    this.getParticipantAccepte();
    this. getUserId();
    this.getUserAccepter();
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
 
  // integration(){
  //   if( this.telephone=='' || this.prenom=='' || this.nom=='' || this.adresse==''|| this.nin=='' || this.numProche=='' ||  this.email==''){
  //   this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

  //   }
  // }
  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
      confirmButtonColor: "#1E1E1E",
    })
  }
   
  getParticipantEnattente(){
    this.participantTontineService.listeParticipantEnAttente(this.idTontineChoisi).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontine=response.data;
    })
  }
  getParticipantAccepte(){
    this.participantTontineService.listeParticipantAccepte(this.idTontineChoisi).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontineAccepte=response.data;
      console.log( 'ko',this.partTontineAccepte)
    })
  }



  envoi(){
    if(this.raison=='' || this.message==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }
  obtenirNomsParticipantsTontine(idTontine: any) {
    // Filtrer les participations pour obtenir celles liées à la tontine spécifiée
    const participationsTontine = this.partTontine.filter((participation: any) => participation.tontine_id === idTontine);
  
    console.log('Participations de la tontine :', participationsTontine);
  
    // Obtenir les noms des participants en utilisant les informations du tableau des utilisateurs
    const nomsParticipants = this.partTontine.map((participation: any) => {
      // Rechercher l'utilisateur correspondant dans le tableau des utilisateurs
      const utilisateur = this.users.find((user: any) => user.id === participation.user_id);
  
      console.log('Participation actuelle :', participation);
      console.log('Utilisateur trouvé :', utilisateur);
       this.tabParticipant.push(utilisateur)
  
      return utilisateur ? utilisateur.nom : 'Utilisateur inconnu';
    });
  
    console.log('Noms des participants :', nomsParticipants);
  
    return this.tabParticipant;
  }
  obtenirNomsParticipantsTontineAccepter(idTontine: any) {
    // Filtrer les participations pour obtenir celles liées à la tontine spécifiée
    const participationsTontine = this.partTontineAccepte.filter((participation: any) => participation.tontine_id === idTontine);
  
    console.log('Participations de la tontine  accepter:', participationsTontine);
  
    // Obtenir les noms des participants en utilisant les informations du tableau des utilisateurs
    const nomsParticipants = this.partTontineAccepte.map((participation: any) => {
      // Rechercher l'utilisateur correspondant dans le tableau des utilisateurs
      const utilisateur = this.users.find((user: any) => user.id === participation.user_id);
  
      console.log('Participation actuelle :', participation);
      console.log('Utilisateur trouvé  accepter:', utilisateur);
       this.tabParticipantAccepter.push(utilisateur)
  
      return utilisateur ? utilisateur.nom : 'Utilisateur inconnu';
    });
  
    console.log('Noms des participants  :', nomsParticipants);
  
    return this.tabParticipantAccepter;
  }
  
  showTable(){
    this.showPartEnAttente=!this.showPartEnAttente;
  }


  getUserId(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
      this.demandeur = this.obtenirNomsParticipantsTontine(this.idTontineChoisi);
      console.log(this.demandeur)
      
  })
  }
  getUserAccepter(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
      this.demandeurAccepter = this.obtenirNomsParticipantsTontineAccepter(this.idTontineChoisi);
      console.log('participant accepteee',this.demandeurAccepter)
      
  })
  }

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      console.log( this.tontineChoisi);
    
  
  
      })
    
  }

  approuverDemande(idDemande:any){
    this.tontineService.ApprouverIntegration(idDemande).subscribe((response:any)=>{
      console.log(response)

    })
    this.showMessage('success','Felicitation..', 'Vous avez accepté la demande d\'adhesion avec succes');
    this.getParticipantEnattente();
  }
  desapprouverDemande(idDemande:any){
    this.tontineService.DesapprouverIntegration(idDemande).subscribe((response:any)=>{
      console.log(response)

      this.showMessage('success','Felicitation..', `${response.message}`);
    })
    this.getParticipantEnattente();
    this.getParticipantAccepte();
  }
  showDetails(article: any) {
    this.details = article;
    console.warn(this.details);
  }

  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }

}
