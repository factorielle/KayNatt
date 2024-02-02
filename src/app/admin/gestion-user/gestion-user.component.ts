import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit{
 
  users:any;

  constructor(private userService:UserService, private logoutService:AuthService, private route:Router){}
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
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

    this.getUser();
  }

  getUser(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.users=response.data
      console.log(this.users)
  })

}

DeconnexionAdmin(){
  this.logoutService.logoutAdmin().subscribe((response:any)=>{
    console.log(response)
    localStorage.removeItem('token')
    this.route.navigate(['/accueil'])
  })
}
}