import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


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
  constructor(private logout:AuthService, private route:Router){}
  ngOnInit(): void {
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
  DeconnexionAdmin(){
    this.logout.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])
    })
  }
  

}
