import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {

  constructor(private userService:UserService){}
  userConnect:any;
  firstLetter:any;
  firstLetterAdmin: any;
prenom: any;
nom: any;
telephone: any;
numProche: any;
email: any;
adresse: any;
nin: any;
password: any;
  ngOnInit(): void {
   this.userConnect=JSON.parse(localStorage.getItem('userInfo') || '{}');
   console.log(this.userConnect);
   this.recupererFistLetterUser();
   
  }

  recupererFistLetterUser(){
    if (this.userConnect && this.userConnect.name) {
      // Récupérer la première lettre de name_admin
      this.firstLetter= this.userConnect.name.charAt(0);
      
      
      // Afficher la première lettre
      console.log(this.firstLetter); 
    } else {
      this.firstLetter= this.userConnect.name_admin.charAt(0);
      
    }
  }
  chargerModal(){
    this.prenom=this.userConnect.name;
    this.telephone=this.userConnect.telephone;
    this.numProche=this.userConnect.telephone_d_un_proche;
    this.email=this.userConnect.email;
    this.adresse=this.userConnect.adresse;
    this.nin=this.userConnect.num_carte_d_identite;
  }
  modifierUser(){
    const user={
      name:this.prenom,
      telephone:this.telephone,
      telephone_d_un_proche:this.numProche,
      adresse:this.adresse,
      num_carte_d_identite:this.nin,
      email:this.email,
      password:this.password
    }
    this.userService.updateUser(user).subscribe((response:any)=>{
      console.log(response)
      this.showMessage('info','',`${response.message}`)
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
}
