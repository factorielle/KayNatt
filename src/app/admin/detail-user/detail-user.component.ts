import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit{
  raison:string='';
  message:string='';
  userChoisi:any;
  users:any;

  constructor(private route: ActivatedRoute, private userService:UserService, private authService:AuthService, private router:Router){}
  idUserChoisi = this.route.snapshot.params['id'];
  ngOnInit(){
    this.userService.getUsers().subscribe((response:any)=>{
      console.log(response);
      this.users=response.data;
      console.log(this.users)
      this.userChoisi = this.users.find((element: any) => element.id == this.idUserChoisi);

    })
  }

  DeconnexionAdmin(){
    this.authService.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.router.navigate(['/accueil'])
    })
  }

  envoi(){
    if(this.raison=='' || this.message==''){
    this.showMessage("error", "Oops","Veuillez renseigner tous les champs");

    }
  }

  showMessage(icon:any, titre:any, texte:any){
    Swal.fire({
      icon: icon,
      title: titre,
      text: texte,
    })
  }
  SupprimerUser(){
    this.userService.deleteUser(this.idUserChoisi).subscribe((response:any)=>{
      console.log(response)
    })
  }
}
