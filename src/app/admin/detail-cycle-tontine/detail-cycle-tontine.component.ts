import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-cycle-tontine',
  templateUrl: './detail-cycle-tontine.component.html',
  styleUrls: ['./detail-cycle-tontine.component.css']
})
export class DetailCycleTontineComponent  implements OnInit{
  tontines: any;
  tontineChoisi: any;
  idTontine:any;
  idCycle:any;
  listeCycles: any;
  cycleChoisi: any;
  partTontineAccepte: any;
  contribution: any;
  montant: any;
  tontineEnAttente: any[]=[];
  tontineEnCours: any[]=[];
  tontineStat: any;
  tontineTermine: any[]=[];
  users: any;
  constructor(private route:ActivatedRoute, private tontineService:TontineService, private cycleService:CycleService, private authService:AuthService, private router:Router, private userService:UserService){}
  dtOptions: DataTables.Settings = {};
  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.idTontine = params.get('idTontine');
      this.idCycle = params.get('idCycle');
      console.log(this.idTontine);
       console.log(this.idCycle);
      
    });
    this.dtOptions = {
      searching: true,
      lengthChange: true,
      paging: true,
      responsive:true,
      info: false,
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json'
      }
    };
    this.getTontine();
    this.getCycle();
    this.getParticipantAccepte();
    this.responsive();
    this.cotisations();
    this.getUser();
    this.listeTontines();
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

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontine);
      console.log( this.tontineChoisi);
  })
  }
  getCycle(){
    this.cycleService.listeCycles(this.idTontine).subscribe((response:any)=>{
      console.log("Response reçue:", response);
      if (response.data && response.data.length > 0) {
        this.listeCycles = response.data;
        console.log("Liste des cycles:", this.listeCycles); 
        this.cycleChoisi = this.listeCycles.find((element: any) => element.id == this.idCycle);
        console.log(" cycleChoisi:", this.cycleChoisi); 
      } else {
        console.log("Aucune donnée de cycle trouvée");
      }
    })
  }
  getParticipantAccepte(){
    this.tontineService.listeParticipantAccepte(this.idTontine).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontineAccepte=response.data;
      console.log( 'liste participation',this.partTontineAccepte)
    })
  }
  cotisations(){
    this.cycleService.listeCotisation(this.idCycle).subscribe((response:any)=>{
      console.log('cotis',response);
      this.montant=response.montant_a_gagner
      this.contribution=response.data
      console.log('sation',this.contribution)
    })
  
  }

  getUser(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
  })  
  
  }
  listeTontines(){
  this.tontineService.AfficherTontine().subscribe((response:any)=>{
    this.tontineStat=response.data;
    console.log(this.tontineStat); 
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
  this.tontines.forEach((element:any) => {
  if (element.etat === 'en_attente') {
      this.tontineEnAttente.push(element);
  }
  });
  });
  }

  
  DeconnexionAdmin(){
    this.authService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])
    })
  }
}
