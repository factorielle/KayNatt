import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loggedOut:any;
  loggedIn:any;
  
   constructor(private authService:AuthService, private route:Router){}
  ngOnInit() {
  if(localStorage.getItem('token')!=null){
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
      localStorage.removeItem('token')
      this.loggedIn=false;
      this.loggedOut=true;
    })
  }
  redirection(){
    const user=JSON.parse(localStorage.getItem('userInfo')||'{}');
    console.log(user)
    if(user.role=="admin"){
      this.route.navigate(['/accueilAdmin'])
    }
   else if(user.role=='createur_tontine'){
           

      this.route.navigate(['/dashboardGerant']);

      
    }else if(user.role=='participant_tontine'){
      this.route.navigate(['/dashboardPart'])
      
    }
    else{
      this.route.navigate(['/accueil'])

    }

  }
}
