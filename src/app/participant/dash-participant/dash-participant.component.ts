import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';

@Component({
  selector: 'app-dash-participant',
  templateUrl: './dash-participant.component.html',
  styleUrls: ['./dash-participant.component.css']
})
export class DashParticipantComponent implements  OnInit{
  dtOptions: DataTables.Settings = {};
  userConnect:any;
  idUser:any;
  tontines:any;

  constructor(private authService:AuthService, private route:Router, private tontineService: TontineService){}
  ngOnInit() {
    this.userConnect=JSON.parse(localStorage.getItem('userInfo') || '{}')
    console.log(this.userConnect)
    this.idUser=this.userConnect.id;
    console.log(this.idUser)
    
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

    this.getTontine();

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
  getTontine(){
    this.tontineService.listeTontineParPart(this.idUser).subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data;
      console.log(this.tontines)
    })

  }

}
