import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-cycle-tontine-gerant',
  templateUrl: './liste-cycle-tontine-gerant.component.html',
  styleUrls: ['./liste-cycle-tontine-gerant.component.css']
})
export class ListeCycleTontineGerantComponent implements OnInit{
  users: any;
  demandeur: any;
  tontineChoisi: any;
  tontines: any;
  listeCycles:any;
  listeParticipants:any;
  dates:any;

  constructor(private cycleService:CycleService, private route:ActivatedRoute, private userService:UserService, private tontineService:TontineService, private authService:AuthService, private router:Router){}
  idTontineChoisi=this.route.snapshot.params['id']
  numero:string='';
  correspondance:string='';
  dButoir:string='';
  penalite:string='';

  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.getTontine();
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

    // liste cycle
    this.afficherCycle()
  

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
//  AjoutCycle(){
//   if(this.numero=='' || this.correspondance=='' || this.dButoir=='' || this.penalite==''){
//     this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

//   }
//  }
//  ModifCycle(){
//   if(this.numero=='' || this.correspondance=='' || this.dButoir=='' || this.penalite==''){
//     this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

//   }
//  }

 showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}

getCycle(){

 this.cycleService.gestionCycle(this.idTontineChoisi).subscribe((response:any)=>{
  console.log(response.cycles);
  this.showMessage('info','',`${response.status_message}`);
})
}
afficherCycle(){
  this.cycleService.listeCycles(this.idTontineChoisi).subscribe((response:any)=>{
    console.log("Response reçue:", response); // Affiche la structure de l'objet response
    if (response.data && response.data.length > 0) {
      this.listeCycles = response.data;
      console.log("Liste des cycles:", this.listeCycles); // Affiche les données du cycle
    } else {
      console.log("Aucune donnée de cycle trouvée");
    }
  })
}

getTontine(){
  this.tontineService.AfficherTontine().subscribe((response:any)=>{
    this.tontines=response.data
    console.log(this.tontines)
    this.tontineChoisi = this.tontines.find((element: any) => element.id == this.idTontineChoisi);
    console.log( this.tontineChoisi);
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