import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedOut:any;
  loggedIn:any;
  
   constructor(private authService:AuthService){}
  ngOnInit() {
  if(localStorage.getItem('userOnline')!=null){
    this.loggedIn=true;
    this.loggedOut=false;
  }  else{
    this.loggedIn=false;
    this.loggedOut=true;
  }
  
  }

  deconnexion(){
    this.authService.logout().subscribe((response:any)=>{
      console.log(response);
      localStorage.removeItem('userOnline')
      this.loggedIn=false;
      this.loggedOut=true;
    })
  }

}
