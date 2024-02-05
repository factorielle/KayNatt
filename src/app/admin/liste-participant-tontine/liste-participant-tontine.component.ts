import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-participant-tontine',
  templateUrl: './liste-participant-tontine.component.html',
  styleUrls: ['./liste-participant-tontine.component.css']
})
export class ListeParticipantTontineComponent implements OnInit{
  partTontineAccepte: any;
  tabParticipantAccepter: any;
  users: any;
  demandeurAccepter: any;
  tontines: any;
  tontineChoisi: any;
  constructor(private route:ActivatedRoute, private router:Router, private authService:AuthService, private participantTontineService:TontineService, private userService:UserService){}
  idTontineChoisi=this.route.snapshot.params['id']

  dtOptions: DataTables.Settings = {};
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

    this.getParticipantAccepte();
    this.getUserAccepter();
    this.getTontine();

  }

  getParticipantAccepte(){
    this.participantTontineService.listeParticipantAccepte(this.idTontineChoisi).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontineAccepte=response.data;
      console.log( 'participation',this.partTontineAccepte)
    })
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

  getUserAccepter(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
      this.demandeurAccepter = this.obtenirNomsParticipantsTontineAccepter(this.idTontineChoisi);
      console.log('participant accepteee',this.demandeurAccepter)
      
  })
  }

  getTontine(){
    this.participantTontineService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
      console.log( this.tontineChoisi);
    
  
  
      })
    
  }


  DeconnexionAdmin(){
    this.authService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])
    })
  }

}
