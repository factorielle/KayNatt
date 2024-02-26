import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TontineService } from 'src/app/services/tontine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dash-gerant',
  templateUrl: './dash-gerant.component.html',
  styleUrls: ['./dash-gerant.component.css']
})
export class DashGerantComponent implements OnInit {
 
  libelle:any;
  nbrPart:any;
  montant:any;
  periode:string='';
  date_de_debut:string='';
  duree:string='';
  regle:string='';
  description:string='';
  tomorrow:any = new Date(Date.now() + 24 *60*60*1000 );
  dtOptions: DataTables.Settings = {};

  tontines:any;

    // Variables pour faire la verifications
 verifNomTontine: String = '';
 verifPart: String = '';
 verifType: String = '';
 verifDate: String = '';
 verifRegle: String = '';
 verifDescription: String = '';
 verifCotisation: String = '';


   // Variables si les champs sont exacts
   exactNomTontine: boolean = false;
   exactPart: boolean = false;
   exactType: boolean = false;
   exactDate: boolean = false;
   exactRegle: boolean = false;
   exactDescription: boolean = false;
   exactCotisation: boolean = false;

  constructor(private tontineService:TontineService, private authService:AuthService, private route:Router){}
  ngOnInit() {
    this.getTontineByUser();
    this.dtOptions = {
      searching: true,
      lengthChange: true,
      responsive:true,
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

  ajoutTontine(){
    const token=localStorage.getItem('token')
    if(token){
      if(this.libelle=='' || this.nbrPart=='' || this.montant=='' || this.periode=='' || this.date_de_debut==''  || this.regle=='' || this.description==''){
      this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
      
    }else if(this.nbrPart <= 1){
      this.showMessage("error", "Oops","Le nombre de participant ne doit pas etre  egal à 1");

    }
    else if(this.date_de_debut < this.tomorrow){
      this.showMessage("error", "Oops","choisir une date valide");

    }
    else if(this.montant<=0 || isNaN(this.montant)){
      this.showMessage("error", "Oops","choisir un montant valide");
    }
    else{
      const tontine={
        libelle:this.libelle,
        description:this.description,
        montant:this.montant,
        regles:this.regle,
        date_de_debut:this.date_de_debut,
        etat:'en_attente',
        statutTontine:'en_attente',
        periode:this.periode,
        nombre_participant:parseInt(this.nbrPart)
      }
      console.log('je suis',typeof parseInt(this.nbrPart))
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

getTontineByUser(){ 
  const userConnect=JSON.parse(localStorage.getItem('userInfo')||'{}')
  this.tontineService.listeTontineByUsr(userConnect.id).subscribe((response:any)=>{
    this.tontines=response.data
    console.log(this.tontines);
  })
}

deconnexion(){
  this.authService.logout().subscribe((response:any)=>{
    console.log(response);
    localStorage.removeItem('token')
    this.route.navigate(['/accueil'])

  })
}

  // Verification du nom
  NomPattern1 = /^[a-zA-Z ]+$/;
  verifNomFonction() {
    this.exactNomTontine = false;
    if (this.libelle == '') {
      this.verifNomTontine = '';
      // this.verifNom = 'Veuillez renseigner votre nom';
    } else if (!isNaN(this.libelle)) {
      this.verifNomTontine = 'Le nom de la tontine ne doit pas etre des numeriques';
    } else if (this.libelle.length < 4) {
      this.verifNomTontine = 'Le nom est trop court';
    } else if (!this.libelle.match(this.NomPattern1)) {
      this.verifNomTontine = 'Donner un nom valide';
    } else {
      this.verifNomTontine = '';
      this.exactNomTontine = true;
    }
  }
  pattern = /^[0-9]+$/;
  verifPartFonction(){
    this.exactPart = false;
  
    // Gestion des cas vides
    if (this.nbrPart === null || this.nbrPart === undefined || this.nbrPart === '') {
      this.verifPart = '';
    } else if (this.nbrPart <= 1) { // Remplacer 13 par la longueur du NIN
      this.verifPart = 'Le nombre de participant ne doit pas etre  egal à 1'; // Adapter le message d'erreur
    }
    else if (this.nbrPart.length >= 3) { // Remplacer 13 par la longueur du NIN
      this.verifPart = 'Le nombre de participant ne doit pas etre un nombre a trois chiffres '; // Adapter le message d'erreur
    }
     else if(!this.nbrPart.match(this.pattern)){
      this.verifPart = 'Le nombre de participant ne doit  etre  qu\'un nombre';
    }
     else {
      this.exactPart = true;
      this.verifPart = '';
    }
  }
  verifCotFonction(){
    this.exactCotisation = false;
  
    // Gestion des cas vides
    if (this.montant === null || this.montant === undefined || this.montant === '') {
      this.verifCotisation = '';
    } else if (this.montant <= 0) { // Remplacer 13 par la longueur du NIN
      this.verifCotisation = 'La cotisationt ne doit pas etre  negatif ou nulle '; // Adapter le message d'erreur
    }
     else if(!this.montant.match(this.pattern)){
      this.verifCotisation = 'La cotisation ne doit  etre  qu\'un nombre';
    }
     else {
      this.exactCotisation = true;
      this.verifCotisation = '';
    }
  }
  
  verifTypeFonction() {
    this.exactType = false;
    if (this.periode == '') {
      this.verifType = '';
    }
   else {
     this.exactType = true;
      this.verifType = '';
    
  }
   }
  
  //  verification date
  verifDateFonction(){
  this.exactDate=false;
  if(this.date_de_debut==''){
    this.verifDate='';
  } else if(this.date_de_debut < this.tomorrow){
    this.verifDate='choisir une date valide'
  }else{
    this.verifDate='';
    this.exactDate=true;
  
  }
  
  }
  
  verifDescFonction() {
    this.exactDescription = false;
    if (this.description == '') {
      this.verifDescription = '';
      // this.verifNom = 'Veuillez renseigner votre nom';
    }  else if (this.description.length < 9) {
      this.verifDescription = 'La description est trop court';
    }  else {
      this.verifDescription = '';
      this.exactDescription = true;
    }
  }
  verifRegleFonction() {
    this.exactRegle = false;
    if (this.regle == '') {
      this.verifRegle = '';
      // this.verifNom = 'Veuillez renseigner votre nom';
    }  else if (this.regle.length < 9) {
      this.verifRegle = 'Les regles doivent etre clair et concis ';
    }  else {
      this.verifRegle = '';
      this.exactRegle = true;
    }
  }
}