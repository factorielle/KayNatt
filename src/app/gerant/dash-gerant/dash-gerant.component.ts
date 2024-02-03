import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-gerant',
  templateUrl: './dash-gerant.component.html',
  styleUrls: ['./dash-gerant.component.css']
})
export class DashGerantComponent implements OnInit {
 
  libelle:string='';
  nbrPart:string='';
  montant:string='';
  periode:string='';
  date_de_debut:string='';
  duree:string='';
  regle:string='';
  description:string='';
  dtOptions: DataTables.Settings = {};

  tontines:any;

  constructor(private tontineService:TontineService, private authService:AuthService, private route:Router){}
  ngOnInit() {
    this.getTontineByUser();
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
    
   
      if(this.libelle=='' || this.nbrPart=='' || this.montant=='' || this.periode=='' || this.date_de_debut==''  || this.regle=='' || this.description==''){
      this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
      
    }else{
      const tontine={
        libelle:this.libelle,
        description:this.description,
        montant:this.montant,
        regles:this.regle,
        date_de_debut:this.date_de_debut,
        etat:'en_attente',
        statutTontine:'en_attente',
        periode:this.periode,
        nombre_participant:this.nbrPart
      }
      this.tontineService.AjouterTontine(tontine).subscribe((response:any)=>{
        console.log(response)
        this.showMessage('success','Felicitations', `${response.status_message}`)
      })
    }

  }
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}

getTontineByUser(){ 
  const userConnect=JSON.parse(localStorage.getItem('userInfo')||'{}')
  this.tontineService.listeTontineByUsr(userConnect.id).subscribe((response:any)=>{
    this.tontines=response.data
    console.log(this.tontines);
  })
}

deconnexion(){
  this.authService.logout().subscribe((response:any)=>{
    console.log(response);
    localStorage.removeItem('token')
    this.route.navigate(['/accueil'])

  })
}

}