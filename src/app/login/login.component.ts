import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  afficherLogin:boolean=true;
  afficherIns:boolean=true;
  ngOnInit() {

  }
  
afficherFormIns(){
  this.afficherLogin=!this.afficherLogin
}
afficherFormIns2(){
  this.afficherIns=!this.afficherIns
}
 

}
