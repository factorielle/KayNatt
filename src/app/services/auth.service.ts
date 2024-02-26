import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
  loginAdmin(user:any){
    return this.http.post(`${url}loginAdmin`, user)
  }

  // methode pour se deconnecter
 logout(){
  const token=localStorage.getItem('token')
  return  token? this.http.post<any>(`${url}logoutUser`,  {
    headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
  })
: of(null);
 }
 logoutAdmin(){
  const token=localStorage.getItem('token')
  return  token? this.http.post<any>(`${url}logoutAdmin`,  {
    headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
  })
: of(null);
 }

 
}
