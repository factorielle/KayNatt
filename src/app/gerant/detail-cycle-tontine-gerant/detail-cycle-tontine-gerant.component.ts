import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detail-cycle-tontine-gerant',
  templateUrl: './detail-cycle-tontine-gerant.component.html',
  styleUrls: ['./detail-cycle-tontine-gerant.component.css']
})
export class DetailCycleTontineGerantComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  // tirage
  participants: string[] = ['Participant1', 'Participant2', 'Participant3', 'Participant4', 'Participant5', 'Participant6'];
  gagnant: any;
 
  constructor(private authService:AuthService, private router:Router){}


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

  tirageEffectue: boolean = false;

  effectuerTirage() {
    if (!this.gagnant) {
      const indexGagnant = Math.floor(Math.random() * this.participants.length);
      this.gagnant = this.participants[indexGagnant];
      this.tirageEffectue = true;
    }
  }
  
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }
  
  
  

}
