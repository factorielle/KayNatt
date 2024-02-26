import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';

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
  constructor(private route:ActivatedRoute, private tontineService:TontineService, private cycleService:CycleService){}
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
    this.getParticipantAccepte()
    this.responsive();
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
}
