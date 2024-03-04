import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-cycle-tontine-gerant',
  templateUrl: './detail-cycle-tontine-gerant.component.html',
  styleUrls: ['./detail-cycle-tontine-gerant.component.css']
})
export class DetailCycleTontineGerantComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  
  gagnant: any;
  cycleChoisi:any;
  tontineId:any;
  cycleId:any;
  listeCycles: any;
  tontines: any;
  tontineChoisi: any;
  users: any;
  demandeurAccepter: any;
  tabParticipantAccepter: any[]=[];
  partTontineAccepte: any;
  details = { name: '', email: '', adresse: '', telephone:'', num_carte_d_identite:'', telephone_d_un_proche:'', };
  paiement: any;
  idGagnant:any;
  idParticipation:any;
  participation: any;
  date: any;
  verifCotisation: String = '';
  exactCotisation: boolean = false;
  contribution: any;
  montant: any;
  tontineEnCours: any[]=[];
  tontineStat: any[]=[];
  tontineTermine: any[]=[];

  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router, private cycleService:CycleService, private tontineService:TontineService, private userService:UserService){}


  ngOnInit() {
    // recuperation des id 
    this.route.paramMap.subscribe(params => {
      this.tontineId = params.get('idTontine');
      this.cycleId = params.get('idcycle');
      console.log(this.tontineId);
       console.log(this.cycleId);
      
    });

    this.getParticipantAccepte();
    this.getUserAccepter();
    this.cotisations();

    // liste cycle
    this.getCycle();
    // liste tontine
    this.getTontine();
    this.getTontineByUser();

    // dataTables
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

  tirageEffectue: boolean = false;

  effectuerTirage() {
    if (!this.gagnant) {
      const indexGagnant = Math.floor(Math.random() * this.tabParticipantAccepter.length);
      this.tirageEffectue = true;
    }
  }
  tirage(){
    this.cycleService.faireTirage(this.cycleId).subscribe((response:any)=>{
      console.log(response)
      Swal.fire({
        icon:'info',
        title:'',
        text:`${response.status_message}`
      })
      this.idGagnant=response.data[0].user_id;
    
      console.log(this.idGagnant)
      this.gagnant=this.users.find((element:any)=>element.id==this.idGagnant);
        console.log(this.gagnant);
    
    })

  }
  
  getCycle(){
    this.cycleService.listeCycles(this.tontineId).subscribe((response:any)=>{
      console.log("Response reçue:", response); // Affiche la structure de l'objet response
      if (response.data && response.data.length > 0) {
        this.listeCycles = response.data;
        console.log("Liste des cycles:", this.listeCycles); // Affiche les données du cycle
        this.cycleChoisi = this.listeCycles.find((element: any) => element.id == this.cycleId);
        console.log(" cycleChoisi:", this.cycleChoisi); 
      } else {
        console.log("Aucune donnée de cycle trouvée");
      }
    })
  }

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.tontineId);
      console.log( this.tontineChoisi);
  })
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

  getParticipantAccepte(){
    this.tontineService.listeParticipantAccepte(this.tontineId).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontineAccepte=response.data;
      console.log( 'liste participation',this.partTontineAccepte)
    })
  }
  getUserAccepter(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
      this.demandeurAccepter = this.obtenirNomsParticipantsTontineAccepter(this.tontineId);
      console.log('participant accepteee',this.demandeurAccepter)
      
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
  
    console.log('Noms des participants  :', this.tabParticipantAccepter);
  
    return this.tabParticipantAccepter;
  }
 
  // detailUser
  showDetails(article: any) {
    this.details = article;
    console.warn(this.details);
  }


  participerCycle(){
    const paiement={
      date_paiement:this.cycleChoisi.date_cycle,
      montant_paiement:parseInt(this.paiement)
    }
    console.log(paiement)
    this.cycleService.participerCycle(this.cycleId, paiement).subscribe((response:any)=>{
      console.log(response)
    }
    )
   
  
  }


  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }
  
  pattern = /^[0-9]+$/;
  verifCotFonction(){
    this.exactCotisation = false;
  
    // Gestion des cas vides
    if (this.paiement === null || this.paiement === undefined || this.paiement === '') {
      this.verifCotisation = '';
    } else if (this.paiement <= 0) { // Remplacer 13 par la longueur du NIN
      this.verifCotisation = 'La cotisationt ne doit pas etre  negatif ou nulle '; // Adapter le message d'erreur
    }
     else if(!this.paiement.match(this.pattern)){
      this.verifCotisation = 'La cotisation ne doit  etre  qu\'un nombre';
    }
     else {
      this.exactCotisation = true;
      this.verifCotisation = '';
    }
  }  

  cotisations(){
    this.cycleService.listeCotisation(this.cycleId).subscribe((response:any)=>{
      console.log('cotis',response);
      this.contribution=response.data;
      this.montant=response.montant_a_gagner
      console.log('sation',this.contribution)
    })
  
  }
  

}
