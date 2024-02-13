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
          this.showMessage('success','Felicitation','Bienvenu sur KayNatt')
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

connexion(){
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

  if (this.email == "" || this.password == "") {
    this.showMessage("Desole", "Veuillez remplir tous les champs", "error");
  } else if (!this.email.match(emailPattern)) {
    this.showMessage("desole", "l'email n'est pas valide", "error");
  } else if (this.password.length < 5) {
    this.showMessage("desole", "Le mot de passe doit être supérieur ou égal à 5", "error");
  }else{
    const credentials={
      email:this.email,
      password:this.password
    }
    this.authService.login(credentials).subscribe(
      (response:any) => {
        // Stockez le token dans un service ou dans le stockage local (localStorage).
        console.log(response)
        console.log(response.data.role)
        localStorage.setItem('token', response.token)
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        if(response.token){
          
          this.showMessage("success", "Bienvenu",`${response.data.name}`);
          if(response.data.role=='createur_tontine'){
           

            this.route.navigate(['/dashboardGerant']);

            
          }else if(response.data.role=='participant_tontine'){
            this.route.navigate(['/dashboardPart'])

          }
          else{
            this.showMessage('error','Oops', 'Ce compte n\'existe pas')
          }
          }
        // this.route.navigate(['/accueil'])
      },
      (error:any) => {
        // Gérez les erreurs de connexion.
        console.error('Erreur de connexion :', error);
      }
    );
  }
}


// connexionAmin
connexionAdmin(){
  if ( this.password=='' || this.email=='')  {
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");
   
  }else{
    const credentials={
      email_admin:this.email,
      password:this.password
    }
    this.authService.loginAdmin(credentials).subscribe(
      (response:any) => {
        // Stockez le token dans un service ou dans le stockage local (localStorage).
        console.log(response)
        // console.log(response.data.role)
        localStorage.setItem('userInfo',JSON.stringify(response.data) )
        localStorage.setItem('token', response.token)
     if(response.token ){
      this.route.navigate(['/accueilAdmin'])
    this.showMessage("success", "Bienvenu",`${response.data.name_admin}`);
      
  
    }
    else{
      this.showMessage('error','Oops', 'Ce compte n\'existe pas');
    }
  })

  }
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

}
