import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-gerant',
  templateUrl: './dash-gerant.component.html',
  styleUrls: ['./dash-gerant.component.css']
})
export class DashGerantComponent implements OnInit {
  nomTontine:string='';
  nbrPart:string='';
  cotisation:string='';
  type:string='';
  dDebut:string='';
  dFin:string='';
  regle:string='';
  description:string='';
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