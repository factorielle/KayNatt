import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-liste-cycle-tontine-participant',
  templateUrl: './liste-cycle-tontine-participant.component.html',
  styleUrls: ['./liste-cycle-tontine-participant.component.css']
})
export class ListeCycleTontineParticipantComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  userConnect: any;
  idUser: any;
  cycles: any;
  tontines: any;
  tontineChoisi: any;
  participants: any;
  userChoisi: any;
  participation_tontine_id: any;

  constructor(private authService:AuthService, private router:Router, private route:ActivatedRoute, private tontineService:TontineService, private userService:UserService, private cycleService:CycleService){}
  idtontine=this.route.snapshot.params['id']
  ngOnInit(){
    this.userConnect=JSON.parse(localStorage.getItem('userInfo')||'{}')
    this.idUser=this.userConnect.id;
    console.log(this.userConnect);
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
    this.getParticipant();


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
    
     this.getCycles();
  }
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }

  getParticipant(){
    this.tontineService.participantTontine(this.idtontine).subscribe((response:any)=>{
      console.log(response)
      this.participants=response.data
      console.log('participants',this.participants)
      this.userChoisi=this.participants.find((element:any)=>element.user_id==this.idUser);
      console.log('userChoisi', this.userChoisi)
      this.participation_tontine_id=this.userChoisi.id;
      console.log(this.participation_tontine_id)
      this.tontineService.tontineAccepter().subscribe((response:any)=>{
        console.log(response)
        this.tontines=response.data
        console.log(this.tontines);
        this.tontineChoisi=this.tontines.find((element:any)=>element.id==this.idtontine);
        console.log(this.tontineChoisi)

      })
      this.cycleService.listeCycles(this.idtontine).subscribe((response:any)=>{
        console.log(response);
        this.cycles=response.data
        console.log(this.cycles)
    
      
      })
    })
  }

  getCycles(){
   
  }

}
