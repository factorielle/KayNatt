import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-cycle-tontine-participant',
  templateUrl: './detail-cycle-tontine-participant.component.html',
  styleUrls: ['./detail-cycle-tontine-participant.component.css']
})
export class DetailCycleTontineParticipantComponent implements OnInit{
  constructor(private authService:AuthService, private route:Router){}
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
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])

    })
  }


}
