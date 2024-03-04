import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tontine } from 'src/app/model/tontine';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-tontine',
  templateUrl: './gestion-tontine.component.html',
  styleUrls: ['./gestion-tontine.component.css']
})
export class GestionTontineComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  tontines:Tontine[]=[];
  tontineEnAttente: any[]=[];
  tontineEnCours: any[]=[];
  tontineTermine: any[]=[];
  users: any;

constructor(private tontintService:TontineService, private logoutService:AuthService, private route:Router, private userService:UserService){}

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
    this.listeTontines();
    this.getUser();
    this.responsive();
  }

  getUser(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
  })

}
  listeTontines(){
    this.tontintService.AfficherTontine().subscribe((response:any)=>{
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

  AccepterTontine(tontine:any){
    this.tontintService.ApprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response);
      this.showMessage('success','Felicitation','Creation tontine approuvée avec succes')
      this.listeTontines();
    })
  }

  RefuserTontine(tontine:any){
    this.tontintService.DesapprouverTontine(tontine).subscribe((response:any)=>{
      console.log(response);
      this.showMessage('success','Felicitation','Creation de tontine refusée avec succes')
      this.listeTontines();
    })
  }

  DeconnexionAdmin(){
    this.logoutService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.showMessage('success','Felicitations','Deconnexion faite avec succes')
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
  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
      confirmButtonColor: "#1E1E1E",
    })
  }
 
}
