import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-cycle-tontine-gerant',
  templateUrl: './liste-cycle-tontine-gerant.component.html',
  styleUrls: ['./liste-cycle-tontine-gerant.component.css']
})
export class ListeCycleTontineGerantComponent implements OnInit{
  numero:string='';
  correspondance:string='';
  dButoir:string='';
  penalite:string='';

  dtOptions: DataTables.Settings = {};
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
 AjoutCycle(){
  if(this.numero=='' || this.correspondance=='' || this.dButoir=='' || this.penalite==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

  }
 }
 ModifCycle(){
  if(this.numero=='' || this.correspondance=='' || this.dButoir=='' || this.penalite==''){
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