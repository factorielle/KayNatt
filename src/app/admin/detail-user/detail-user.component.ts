import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit{
  raison:string='';
  message:string='';
  userChoisi:any;
  users:any;

  constructor(private route: ActivatedRoute, private userService:UserService, private authService:AuthService, private router:Router){}
  idUserChoisi = this.route.snapshot.params['id'];
  ngOnInit(){
    this.userService.getUsers().subscribe((response:any)=>{
      console.log(response);
      this.users=response.data;
      console.log(this.users)
      this.userChoisi = this.users.find((element: any) => element.id == this.idUserChoisi);

    })
    this.responsive();
  }

  DeconnexionAdmin(){
    this.authService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])
    })
  }

  envoi(){
    if(this.raison=='' || this.message==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }

  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
      confirmButtonColor: "#1E1E1E",
    })
  }
  SupprimerUser(){
  
   
    Swal.fire({
      title: "Voulez vous vraiment bloquer cet utilisateur?",
      text: "Cette action est irreversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#F0E9D8",
      cancelButtonColor: "#1E1E1E",
      confirmButtonText: "Oui, Bloquer!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.idUserChoisi).subscribe((response:any)=>{
          console.log(response)
         
        })
        Swal.fire({
          title: "Bloquer!",
          text: "utilisateur bloqué!",
          icon: "success"
        });
      }
    });
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
