import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { url } from '../model/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // afficher utilisateurs
  getUsers(){
  
    return this.http.get<any>(`${url}ListeUser`)

  }
  // supprimer user
  deleteUser(users:any){
   
    return this.http.delete<any>(`${url}admin/supprimerUser/${users}`)
 
  }
  // modifier profil
  updateUser(user:any){
    return this.http.post(`${url}modifierUser`, user)
  }

}
