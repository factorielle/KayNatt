import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dash-accueil',
  templateUrl: './dash-accueil.component.html',
  styleUrls: ['./dash-accueil.component.css'],
  animations: [
    trigger('rotateInOut', [
      transition(':enter', [
        style({ transform: 'rotate(0deg)' }),
        animate('500ms ease-in-out', style({ transform: 'rotate(360deg)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'rotate(-360deg)' })),
      ]),
    ]),
  ],
})
export class DashAccueilComponent implements OnInit{
  constructor(private logout:AuthService, private route:Router){}
  ngOnInit(): void {
    
  }
  DeconnexionAdmin(){
    this.logout.logoutAdmin().subscribe((response:any)=>{
      console.log(response)
      localStorage.removeItem('token')
      this.route.navigate(['/accueil'])
    })
  }
  

}
