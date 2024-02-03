import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-tontine-participant',
  templateUrl: './detail-tontine-participant.component.html',
  styleUrls: ['./detail-tontine-participant.component.css']
})
export class DetailTontineParticipantComponent  implements OnInit{
  raison:string='';
  message:string='';

  constructor(private authService:AuthService, private route:Router){}

  ngOnInit() {


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
  signaler(){
    if(this.raison=='' || this.message==''){
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
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])

    })
  }

}
