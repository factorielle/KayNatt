import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-cycle-tontine',
  templateUrl: './liste-cycle-tontine.component.html',
  styleUrls: ['./liste-cycle-tontine.component.css']
})
export class ListeCycleTontineComponent implements OnInit {
  idtontine: any;
  idUser:any;
  userChoisi:any;
  participants: any;
  participation_tontine_id: any;
  cycles: any;
  tontines: any;
  tontineChoisi: any;
  constructor(private route:ActivatedRoute, private userService:UserService, private tontineService:TontineService, private cycleService:CycleService){}
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idtontine = params.get('idTontine');
      this.idUser = params.get('idUser');
      console.log(this.idtontine);
       console.log(this.idUser);
      
    });

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

    this.getParticipant();
    
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

  getParticipant(){
    this.tontineService.participantTontine(this.idtontine).subscribe((response:any)=>{
      console.log(response)
      this.participants=response.data
      console.log('participants',this.participants)
      this.userChoisi=this.participants.find((element:any)=>element.user_id==this.idUser);
      console.log('userChoisi', this.userChoisi)
      this.participation_tontine_id=this.userChoisi.id;
      console.log(this.participation_tontine_id)
      this.cycleService.listeCyclePart(this.participation_tontine_id).subscribe((response:any)=>{
        console.log(response);
        this.cycles=response.data
        console.log(this.cycles)
    
        this.tontineService.tontineAccepter().subscribe((response:any)=>{
          console.log(response)
          this.tontines=response.data
          console.log(this.tontines);
          this.tontineChoisi=this.tontines.find((element:any)=>element.id==this.idtontine);
          console.log(this.tontineChoisi)
  
        })
      })
    })
  }

}
