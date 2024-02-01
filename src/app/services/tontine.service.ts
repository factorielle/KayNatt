import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { url } from '../model/apiUrl';


@Injectable({
  providedIn: 'root'
})
export class TontineService {

  constructor(private http: HttpClient) {}

  AjouterTontine(tontine:any):Observable<any>{
    const token=localStorage.getItem('userOnline');
    return token
    ? this.http.post<any>(`${url}auth/ajouterTontine`,  tontine, {
        headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
      })
    : of(null);
    }
       
    tontineAccepter():Observable<any>{
        const token=localStorage.getItem('userOnline');
        return token? this.http.get<any>(`${url}ListeTontineAccepte`,  {
          headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
        })
      : of(null);
    }



  AfficherTontine():Observable<any>{
    const token=localStorage.getItem('userOnline');
    return token? this.http.get<any>(`${url}ListeTontine`,  {
      headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
    })
  : of(null);
  }
    ApprouverTontine(tontine:any):Observable<any>{
      const token=localStorage.getItem('userOnline')
      return   token
      ? this.http.post<any>(`${url}admin/AcceptedTontine/${tontine}`,  {
          headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
        })
      : of(null);
        
    }

    DesapprouverTontine(tontine:any){
      const token=localStorage.getItem('userOnline');
      return token
      ? this.http.post<any>(`${url}admin/RefuseTontine/${tontine}`,  {
          headers: new HttpHeaders({ Authorization:` Bearer ${token}` }),
        })
      : of(null);
    }

    IntegrerTontine(tontine:any){
      return this.http.post(`${url}auth/ParticiperTontine`,tontine)
    }

    listeTontineByUsr(user:any){
      return this.http.get(`${url}createur_tontine/ListeTontineparCreateur/${user}`)
    }
     
  }


