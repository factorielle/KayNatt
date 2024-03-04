import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-tontine-participant',
  templateUrl: './liste-tontine-participant.component.html',
  styleUrls: ['./liste-tontine-participant.component.css']
})
export class ListeTontineParticipantComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  details = { name: '', email: '', adresse: '', telephone:'' };
  tontines: any;
  tontineChoisi: any;
  participants: any;
  tontineEnCours: any[]=[];
  tontineTermine: any[]=[];
  tontineStat: any[]=[];
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router, private cycleService:CycleService, private tontineService:TontineService, private userService:UserService){}
  idTontineChoisi = this.route.snapshot.params['id'];
  ngOnInit(): void {
   
    this.tontineStatFonction();
      // dataTables
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

      this.getParticipant();
      this.getTontine();
  }

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
    })
  }


getParticipant(){

  this.tontineService.participantTontine(this.idTontineChoisi).subscribe((response:any)=>{
    console.log(response)
    this.participants=response.data
    console.log(this.participants)
  })
}


deconnexion(){
  this.authService.logout().subscribe((response:any)=>{
    console.log(response);
    localStorage.removeItem('token')
    this.router.navigate(['/accueil'])

  })
}

showDetails(article: any) {
  this.details = article;
  console.warn(this.details);
}
tontineStatFonction(){
  const userConnect=JSON.parse(localStorage.getItem('userInfo') || '{}')
  this.tontineService.listeTontineParPart(userConnect.id).subscribe((response:any)=>{
    console.log(response);
    this.tontineStat=response.data;
    console.log(this.tontineStat);
    this.tontineStat.forEach((element:any) => {
      if (element.etat === 'termine') {
          this.tontineTermine.push(element);
      }
  });
  
  console.log('term', this.tontineTermine);
  this.tontineStat.forEach((element:any) => {
    if (element.etat === 'en_cours') {
        this.tontineEnCours.push(element);
    }
});

console.log('cours', this.tontineEnCours);
  })
    


}
}
