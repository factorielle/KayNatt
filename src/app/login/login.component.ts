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
  afficherLogin:boolean=true;
  afficherIns:boolean=true;
  nom:string='';
  prenom:string='';
  adresse:string='';
  telephone:string='';
  nin:string='';
  email:string='';
  numProche:string='';
  password:string='';
  passwordConf:string='';
 
 

  constructor(private authService:AuthService, private route:Router){}

  ngOnInit() {

  }
  
afficherFormIns(){
  this.afficherLogin=!this.afficherLogin
}
afficherFormIns2(){
  this.afficherIns=!this.afficherIns
}
inscription(){
  if (this.telephone=='' || this.prenom=='' || this.nom=='' || this.adresse=='' || this.numProche=='' || this.nin=='' || this.password=='' || this.passwordConf=='' || this.email=='')  {
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
   
  }
else {
const   user={
    name:this.prenom + this.nom,
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
      this.showMessage('success','Felicitation','Bienvenu sur KayNatt')
      this.route.navigate(['/auth'])
    },
    (error:any) => {
      // Gérez les erreurs d'inscription.
      console.error('Erreur d\'inscription :', error);
    }
  )}
}

connexion(){
  if(this.email=='' || this.password==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

  } else{
    const credentials={
      email:this.email,
      password:this.password
    }
    this.authService.login(credentials).subscribe(
      (response:any) => {
        // Stockez le token dans un service ou dans le stockage local (localStorage).
        console.log(response)
        
        // this.route.navigate(['/accueil'])
      },
      (error:any) => {
        // Gérez les erreurs de connexion.
        console.error('Erreur de connexion :', error);
      }
    );
  }
}
// sweetalert
showMessage(icon:any, titre:any, texte:any){
  Swal.fire({
    icon: icon,
    title: titre,
    text: texte,
  })
}

}
