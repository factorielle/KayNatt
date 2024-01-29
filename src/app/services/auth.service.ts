import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {url} from 'src/app/model/apiUrl'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // methode pour l'inscription
  register(user:any){
    return this.http.post(`${url}registerUser`, user)
  }
  
  // methode pour la connexion
  login(user:any){
    return this.http.post(`${url}loginUser`, user)
  }

 
}
