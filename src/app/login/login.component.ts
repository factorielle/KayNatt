import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {  User } from '../model/tontine';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isAdmin!:boolean;
  afficherLogin:boolean=true;
  afficherIns:boolean=true;
  nom:any;
  prenom:any;
  adresse:any;
  telephone:string='';
  nin:string='';
  email:string='';
  numProche:string='';
  password:string='';
  passwordConf:string='';
 
 // Variables pour faire la verifications
 verifNom: String = '';
 verifAdresse: String = '';
 verifTel: String = '';
 verifProche: String = '';
 verifNin: String = '';
 verifPrenom: String = '';
 verifEmail: String = '';
 verifPassword: String = '';
 verifPasswordConf: String = '';

   // Variables si les champs sont exacts
   exactNom: boolean = false;
   exactAdresse: boolean = false;
   exactTel: boolean = false;
   exactProche: boolean = false;
   exactNin: boolean = false;
   exactPrenom: boolean = false;
   exactEmail: boolean = false;
   exactPassword: boolean = false;
   exactPasswordConf: boolean = false;

   // Pour vÃ©rifier les champs pour la connexion
  verifEmailCon: String = '';
  verifPasswordCon: String = '';

  // Variables Si les valeurs sont exactes
  exactEmailCon: boolean = false;
  exactPasswordCon: boolean = false;

  constructor(private authService:AuthService, private route:Router){}

  ngOnInit() {
   this.isAdmin=false;
  }
  
afficherFormIns(){
  this.afficherLogin=!this.afficherLogin
}
afficherFormIns2(){
  this.afficherIns=!this.afficherIns
}
inscription(){
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "") {
    this.showMessage("Desole", "Veuillez remplir tous les champs", "error");
  } else if (!this.email.match(emailPattern)) {
    this.showMessage("desole", "l'email n'est pas valide", "error");
  } else if (this.password.length < 5) {
    this.showMessage("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
  }
  else{

    const user={
        name:this.prenom +' '+ this.nom,
        email:this.email,
        adresse:this.adresse,
        password:this.password,
        passwordConf:this.passwordConf,
        telephone:this.telephone,
        num_carte_d_identite:this.nin,
        telephone_d_un_proche:this.numProche,
        role:'participant_tontine'
    
        
      }
      this.authService.register(user).subscribe(
        (response:any) => {
         
          console.log(response)
          this.showMessage('success','Felicitation','Bienvenue sur KayNatt')
          this.afficherLogin=true;
          this.route.navigate(['/auth'])
        },
        (error:any) => {
          // Gérez les erreurs d'inscription.
          console.error('Erreur d\'inscription :', error);
        }
      )
  }

}
connexion() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe(
      (response:any) => {
        if (response.token) {
          this.isAdmin=true;
          // alert(this.isAdmin)
          localStorage.setItem("token", response.token);
          localStorage.setItem("userInfo", JSON.stringify(response.data));

          this.showMessage("success", "Bienvenue", `${response.data.name}`);

          const role = response.data.role?.toLowerCase(); 

          if (role === "createur_tontine") {
            this.route.navigate(["/dashboardGerant"]);
          } else if (role === "participant_tontine") {
            this.route.navigate(["/dashboardPart"]);
          } 
        } 
      else{
        
        this.verif();
      }
      }
     
    );
}


// dconnexion(){
//   const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

//   if (this.email == "" || this.password == "") {
//     this.showMessage( "error","Desole", "Veuillez remplir tous les champs");
//   } else if (!this.email.match(emailPattern)) {
//     this.showMessage("error","desole", "l'email n'est pas valide" );
//   }else{
    
//     const credentials={
//       email:this.email,
//       password:this.password
//     }
//     this.authService.login(credentials).subscribe(
//       (response:any) => {
//         // Stockez le token dans un service ou dans le stockage local (localStorage).
//         console.log(response)
//         console.log(response.data.role)
//         localStorage.setItem('token', response.token)
//         localStorage.setItem('userInfo', JSON.stringify(response.data));
//         if(response.token){
          
//           this.showMessage("success", "Bienvenue",`${response.data.name}`);
//           if(response.data.role=='createur_tontine'){

//             this.route.navigate(['/dashboardGerant']);

            
//           }else if(response.data.role=='participant_tontine'){
//             this.route.navigate(['/dashboardPart'])

//           }
//           else{
//             this.showMessage('error','Oops', 'Ce compte n\'existe pas')
//           }
//         }else{
//           console.error("Erreur de connexion:", response); // Provide more informative error message
//           this.showMessage("error", "Oops", "Une erreur est survenue. Veuillez réessayer.");
//         }
//         // this.route.navigate(['/accueil'])
//       },
      
//     );
//   }
// }


// connexionAmin
connexionAdmin(){
    const credentials={
      email_admin:this.email,
      password:this.password
    }
    this.authService.loginAdmin(credentials).subscribe(
      (response:any) => {
        // Stockez le token dans un service ou dans le stockage local (localStorage).
        console.log(response)
       this.isAdmin=true;
        localStorage.setItem('userInfo',JSON.stringify(response.data) )
        localStorage.setItem('token', response.token)
     if(response.token ){
      this.route.navigate(['/accueilAdmin'])
    this.showMessage("success", "Bienvenue",`${response.data.name_admin}`);
      
  
    }
   
  })

  
}

// sweetalert
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
    confirmButtonColor: "#1E1E1E",
  })
}

validation(){

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    if (this.nom == "" || this.prenom == "" || this.email == "" || this.password == "") {
      this.showMessage("Desole", "Veuillez remplir tous les champs", "error");
    } else if (!this.email.match(emailPattern)) {
      this.showMessage("desole", "l'email n'est pas valide", "error");
    } else if (this.password.length < 5) {
      this.showMessage("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
    }
}

 // Fonction de Verification du password pour la fonctionnalitÃ© connexion
 verifPasswordConFonction() {
  this.exactPasswordCon = false;
  if (this.passwordConf == '') {
    this.verifPasswordCon = '';
    // this.verifPasswordCon = 'Veuillez renseigner votre mot de passe';
  } else if (this.passwordConf.length < 3) {
    this.verifPasswordCon = 'Mot de passe doit etre superieur a 5 caracteres';
  } 
   else if (this.passwordConf!= this.password) {
    this.verifPasswordCon = 'Les deux mots de passe ne sont pas conformes';
  } 
  else {
    this.verifPasswordCon = '';
    this.exactPasswordCon = true;
  }
}
verifEmailConFonction() {
  const emailPattern =  /^[A-Za-z]+[A-Za-z0-9\._%+-]+@[A-Za-z][A-Za-z0-9\.-]+\.[A-Za-z]{2,}$/;
  this.exactEmailCon = false;

  if (this.email == '') {
    // this.verifEmailCon = 'Veuillez renseigner votre email';
    this.verifEmailCon = '';
  } else if (
    !this.email.match(emailPattern) ||
    this.email.endsWith('@') ||
    !this.email.includes('.')
  ) {
    this.verifEmailCon = 'Veuillez donner un email valide';
  } 
  else {
    this.verifEmailCon = '';
    this.exactEmailCon = true;
  }
}
verif() {
  // alert(this.isAdmin)
  if(this.isAdmin==false){
    this.showMessage("error", "Oops", "Une erreur est survenue. Veuillez réessayer."); 
    this.email='';
    this.password='';
    this.exactEmailCon=false;
    this.exactPassword=false;
  }
}




// Verification du nom
NomPattern1 = /^[a-zA-Z ]+$/;
verifNomFonction() {
  this.exactNom = false;
  if (this.nom == '') {
    this.verifNom = '';
    // this.verifNom = 'Veuillez renseigner votre nom';
  } else if (!isNaN(this.nom)) {
    this.verifNom = 'Le nom ne doit pas etre des numeriques';
  } else if (this.nom.length < 2) {
    this.verifNom = 'Le nom est trop court';
  } else if (!this.nom.match(this.NomPattern1)) {
    this.verifNom = 'Donner un nom valide';
  } else {
    this.verifNom = '';
    this.exactNom = true;
  }
}
telPattern = /^(77|78|76|70)\d{7}$/;
verifTelFonction(){
  this.exactTel=false;
  if(this.telephone==''){
    this.verifTel='';
  } else if(!this.telephone.match(this.telPattern)){
    this.verifTel='Donner un numero valide';
  } 
  else{
    this.exactTel=true;
    this.verifTel=''
  }
}
verifTelProcheFonction(){
  this.exactProche=false;
  if(this.numProche==''){
    this.verifProche='';
  } else if(!this.numProche.match(this.telPattern)){
    this.verifProche='Donner un numero valide';
  }
  else{
    this.exactProche=true;
    this.verifProche=''
  }
}


 // Verification du prenom
 verifPrenomFonction() {
  this.exactPrenom = false;
  if (this.prenom == '') {
    this.verifPrenom = '';
    // this.verifPrenom = 'Veuillez renseigner votre prenom';
  } else if (!isNaN(this.prenom)) {
    this.verifPrenom = 'Le prenom ne doit pas etre des numeriques';
  } else if (this.prenom.length < 3) {
    this.verifPrenom = 'Le prenom est trop court';
  } else if (!this.prenom.match(this.NomPattern1)) {
    this.verifPrenom = 'Donner un prenom valide';
  } else {
    this.verifPrenom = '';
    this.exactPrenom = true;
  }
}
 verifAdresseFonction() {
  this.exactAdresse = false;
  if (this.adresse == '') {
    this.verifAdresse = '';
    // this.verifPrenom = 'Veuillez renseigner votre prenom';
  } else if (!isNaN(this.adresse)) {
    this.verifAdresse = 'L\'adresse ne doit pas etre des numeriques';
  } else if (this.adresse.length < 3) {
    this.verifAdresse= 'L\'adresse est trop court';
  } else if (!this.adresse.match(this.NomPattern1)) {
    this.verifAdresse = 'Donner une adresse valide';
  } else {
    this.verifAdresse = '';
    this.exactAdresse = true;
  }
}
verifPasswordFonction() {
  this.exactPassword = false;
  if (this.password == '') {
    this.verifPassword = '';
  } else if (this.password.length < 3) {
    this.verifPassword = 'Mot de passe doit etre superieur ou egal à  8';
  } else {
    this.exactPassword = true;
    this.verifPassword = '';
  }
}

// Verification du nin
pattern = /^[0-9]+$/;

verifNinFonction(){
  this.exactNin = false;

  // Gestion des cas vides
  if (this.nin === null || this.nin === undefined || this.nin === '') {
    this.verifNin = '';
  } else if (this.nin.length <= 12) { // Remplacer 13 par la longueur du NIN
    this.verifNin = 'Le numéro d\'identification doit comporter 13 chiffres'; // Adapter le message d'erreur
  } else if (!this.nin.match(this.pattern)) {
    this.verifNin = 'Le numéro d\'identification ne peut contenir que des chiffres';
  } else {
    this.exactNin = true;
    this.verifNin = '';
  }
}



}
