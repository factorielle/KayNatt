import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { TontineService } from 'src/app/services/tontine.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-cycle-tontine-participant',
  templateUrl: './detail-cycle-tontine-participant.component.html',
  styleUrls: ['./detail-cycle-tontine-participant.component.css']
})
export class DetailCycleTontineParticipantComponent implements OnInit{
  tontines: any;
  tontineChoisi: any;
  participants: any;
  cycles: any;
  idtontine: any;
  idUser:any;
  userConnect:any;
  CycleChoisi:any;
  date!: Date;
  paiement: any;
  userChoisi: any;
  participation_tontine_id: any;
  idCycleChoisi: any;

  verifCotisation: String = '';
  exactCotisation: boolean = false;
  contribution: any;
  montant: any;
  tontineEnCours: any[]=[];
  tontineStat: any[]=[];
  tontineTermine: any[]=[];
  constructor(private route:ActivatedRoute,private authService:AuthService, private router:Router, private cycleService:CycleService, private tontineService:TontineService, private userService:UserService){}
  
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idtontine = params.get('idTontine');
      this.idCycleChoisi = params.get('idcycle');
      console.log(this.idtontine);
       console.log(this.idCycleChoisi);
      
    });
    
    this.userConnect=JSON.parse(localStorage.getItem('userInfo')||'{}');
    this.idUser=this.userConnect.id; 
    // this.getCycle();


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
    this.tontineStatFonction();
  this.cotisations();
  this.getParticipant();
  }
  
  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])

    })
  }
 getCycle(){
  this.cycleService.listeCycles(this.idtontine).subscribe((response:any)=>{
    console.log(response);
    this.cycles=response.data
    console.log('cycles get',this.cycles)
    this.CycleChoisi=this.cycles.find((element:any)=>element.id=this.idCycleChoisi)
    console.log('cyclechoisi',this.CycleChoisi)
    this.idtontine=this.cycles[0].tontine_id;
    console.log('idtontine',this.idtontine)
    this.tontineService.tontineAccepter().subscribe((response:any)=>{
      console.log(response)
      this.tontines=response.data
      console.log('tontines',this.tontines);
      this.tontineChoisi=this.tontines.find((element:any)=>element.id=this.idtontine);
      console.log('tontineChoisi',this.tontineChoisi)
      
    this.tontineService.participantTontine(this.idtontine).subscribe((response:any)=>{
      console.log(response)
      this.participants=response.data
      console.log(this.participants)
    })
    })
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
    this.cycleService.listeCycles(this.idtontine).subscribe((response:any)=>{
      console.log(response);
      this.cycles=response.data
      console.log(this.cycles)
      this.CycleChoisi=this.cycles.find((element:any)=>element.id==this.idCycleChoisi)
      this.tontineService.tontineAccepter().subscribe((response:any)=>{
        console.log(response)
        this.tontines=response.data
        console.log(this.tontines);
        this.tontineChoisi=this.tontines.find((element:any)=>element.id==this.idtontine);
        console.log(this.tontineChoisi)

      })
    })
  })
}
participerCycle(){
  
  // const cycle = new FormData();
  // cycle.append('date_paiement', this.date);
  // cycle.append('montant_paiement', this.paiement)

  const paiement={
   date_paiement: this.CycleChoisi.date_cycle,
   montant_paiement:parseInt(this.paiement)
  }
  console.log(paiement)
  this.cycleService.participerCycle(this.idCycleChoisi, paiement).subscribe((response:any)=>{
    console.log(response)
    this.showMessage('info','',`${response.statut_message}`)
    window.open(response.url,'_self');
  }
  )
 

}
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
    confirmButtonColor: "#1E1E1E",
    showConfirmButton: false,
    timer:2000,
  })
}

pattern = /^[0-9]+$/;
verifCotFonction(){
  this.exactCotisation = false;

  // Gestion des cas vides
  if (this.paiement === null || this.paiement === undefined || this.paiement === '') {
    this.verifCotisation = '';
  } else if (this.paiement <= 0) { // Remplacer 13 par la longueur du NIN
    this.verifCotisation = 'La cotisationt ne doit pas etre  negatif ou nulle '; // Adapter le message d'erreur
  }
   else if(!this.paiement.match(this.pattern)){
    this.verifCotisation = 'La cotisation ne doit  etre  qu\'un nombre';
  }
  else if(this.paiement.length<2){
    this.verifCotisation = 'La cotisation ne correspond pas';

  }    
  else {
    this.exactCotisation = true;
    this.verifCotisation = '';
  }
}  

cotisations(){
  this.cycleService.listeCotisation(this.idCycleChoisi).subscribe((response:any)=>{
    console.log('cotis',response);
    this.contribution=response.data
    this.montant=response.montant_a_gagner
    console.log('sation',this.contribution)
  })

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

 
