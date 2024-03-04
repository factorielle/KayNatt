import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TontineService } from 'src/app/services/tontine.service';


@Component({
  selector: 'app-dash-accueil',
  templateUrl: './dash-accueil.component.html',
  styleUrls: ['./dash-accueil.component.css'],
  animations: [
    trigger('rotateInOut', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)' }),
        animate('500ms ease-in-out', style({ transform: 'rotate(360deg)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'rotate(-360deg)' })),
      ]),
    ]),
  ],
})
export class DashAccueilComponent implements OnInit{
  users: any;
  tontines: any;
  tontineTermine: any[]=[];
  tontineEnCours: any[]=[];
  tontineEnAttente: any[]=[];
  constructor(private logout:AuthService, private route:Router, private userService:UserService, private tontineService:TontineService){}
  ngOnInit(): void {
    this.responsive();
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
  DeconnexionAdmin(){
    this.logout.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])
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
    this.tontines=response.data;
    console.log(this.tontines); 
    this.tontines.forEach((element:any) => {
      if (element.etat === 'termine') {
          this.tontineTermine.push(element);
      }
  });
  
  console.log('term', this.tontineTermine);
  this.tontines.forEach((element:any) => {
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
}