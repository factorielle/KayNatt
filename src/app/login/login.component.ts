import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
alert('ho')
  }
}

connexion(){
  if(this.email=='' || this.password==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

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
