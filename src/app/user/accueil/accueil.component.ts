import { Component, HostListener, OnInit } from '@angular/core';
import { TontineService } from 'src/app/services/tontine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  libelle:string='';
  nbrPart:string='';
  montant:string='';
  periode:string='';
  date_de_debut:string='';
  duree:string='';
  regle:string='';
  description:string='';

  articlesParPage = 6; // Nombre d'articles par page
  pageActuelle = 1; // Page actuelle


  tontines:any;
  constructor(private tontineService:TontineService){}

  ngOnInit() {
    this.listeTontineAccepter();
    
  }
  isButtonVisible: boolean = false;

  
    @HostListener('window:scroll', [])
     onWindowScroll = () => { // Use arrow function to preserve `this` context
      this.isButtonVisible = window.scrollY > 100;
    };

 
 

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ajoutTontine(){
    const token=localStorage.getItem('token')
    if(token){
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
        this.showMessage('success','Felicitation',`${response.status_message}`)
      })
    }
    
  }
  else{
    this.showMessage("error", "Oops","Veuillez vous connecter pour creer une tontine ");
    
    }
  }
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
    confirmButtonColor: "#1E1E1E",
  })
}

getArticlesPage(): any[] {
  const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
  const indexFin = indexDebut + this.articlesParPage;
  return this.tontines.slice(indexDebut, indexFin);
}
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this.tontines.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this. tontines.length / this.articlesParPage);
  }

  listeTontineAccepter(){
    this.tontineService.tontineAccepter().subscribe((response:any)=>{
      console.log(response);
      this.tontines=response.data
      console.log(this.tontines)

      
    })
  }

}
