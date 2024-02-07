import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tontine } from 'src/app/model/tontine';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';

@Component({
  selector: 'app-gestion-tontine',
  templateUrl: './gestion-tontine.component.html',
  styleUrls: ['./gestion-tontine.component.css']
})
export class GestionTontineComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  tontines:Tontine[]=[];

constructor(private tontintService:TontineService, private logoutService:AuthService, private route:Router){}

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
    this. listeTontines();
    this.responsive();
  }

  listeTontines(){
    this.tontintService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data;
      console.log(this.tontines); 
    });
  }

  AccepterTontine(tontine:any){
    this.tontintService.ApprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response);
      this. listeTontines();
    })
  }

  RefuserTontine(tontine:any){
    this.tontintService.DesapprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response);
      this. listeTontines();
    })
  }

  DeconnexionAdmin(){
    this.logoutService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])
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
 
}
