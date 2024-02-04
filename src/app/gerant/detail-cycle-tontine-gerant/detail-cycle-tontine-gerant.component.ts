import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';

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
  cycleChoisi:any;
  tontineId:any;
  cycleId:any;
  listeCycles: any;
  tontines: any;
  tontineChoisi: any;
  users: any;
  demandeurAccepter: any;
  tabParticipantAccepter: any;
  partTontineAccepte: any;
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router, private cycleService:CycleService, private tontineService:TontineService, private userService:UserService){}


  ngOnInit() {
    // recuperation des id 
    this.route.paramMap.subscribe(params => {
      this.tontineId = params.get('idTontine');
      this.cycleId = params.get('idcycle');
      console.log(this.tontineId);
       console.log(this.cycleId);
      
    });

    this.getParticipantAccepte();


    // liste cycle
    this.getCycle();
    // liste tontine
    this.getTontine();

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
  }

  tirageEffectue: boolean = false;

  effectuerTirage() {
    if (!this.gagnant) {
      const indexGagnant = Math.floor(Math.random() * this.participants.length);
      this.gagnant = this.participants[indexGagnant];
      this.tirageEffectue = true;
    }
  }
  
  getCycle(){
    this.cycleService.listeCycles(this.tontineId).subscribe((response:any)=>{
      console.log("Response reçue:", response); // Affiche la structure de l'objet response
      if (response.data && response.data.length > 0) {
        this.listeCycles = response.data;
        console.log("Liste des cycles:", this.listeCycles); // Affiche les données du cycle
        this.cycleChoisi = this.listeCycles.find((element: any) => element.id == this.cycleId);
        console.log(" cycleChoisi:", this.cycleChoisi); 
      } else {
        console.log("Aucune donnée de cycle trouvée");
      }
    })
  }

  getTontine(){
    this.tontineService.AfficherTontine().subscribe((response:any)=>{
      this.tontines=response.data
      console.log(this.tontines)
      this.tontineChoisi = this.tontines.find((element: any) => element.id == this.tontineId);
      console.log( this.tontineChoisi);
  })
  }

  getParticipantAccepte(){
    this.tontineService.listeParticipantAccepte(this.tontineId).subscribe((response:any)=>{
      console.log(response.data)
      this.partTontineAccepte=response.data;
      console.log( 'liste participation',this.partTontineAccepte)
    })
  }

 


  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }
  
  
  

}
