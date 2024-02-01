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
    const token=localStorage.getItem('userOnline');
    return token? this.http.get<any>(`${url}ListeUser`,  {
      headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
    })
  : of(null);
  }
  // supprimer user
  deleteUser(users:any){
    const token=localStorage.getItem('userOnline');
    return token? this.http.delete<any>(`${url}admin/supprimerUser/${users}`,  {
      headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
    })
  : of(null);
  }

}
