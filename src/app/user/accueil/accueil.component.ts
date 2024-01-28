import { Component, HostListener, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  nomTontine:string='';
  nbrPart:string='';
  cotisation:string='';
  type:string='';
  dDebut:string='';
  dFin:string='';
  regle:string='';
  description:string='';


  ngOnInit() {
   
  }
  isButtonVisible: boolean = false;

  
    @HostListener('window:scroll', [])
     onWindowScroll = () => { // Use arrow function to preserve `this` context
      this.isButtonVisible = window.scrollY > 100;
    };

 
 

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ajoutTontine(){
    if(this.nomTontine=='' || this.nbrPart=='' || this.cotisation=='' || this.type=='' || this.dDebut=='' || this.dFin=='' || this.regle=='' || this.description==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}
}
