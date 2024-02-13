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
    return  this.http.post<any>(`${url}auth/ajouterTontine`,  tontine)
    
  }
       
  tontineAccepter():Observable<any>{
      
        return  this.http.get<any>(`${url}ListeTontineAccepte`)
      
  }



  AfficherTontine():Observable<any>{

    return  this.http.get<any>(`${url}ListeTontine`)
  }
  ApprouverTontine(tontine:any):Observable<any>{
 
      return  this.http.post<any>(`${url}admin/AcceptedTontine/${tontine}`,tontine)
      
  }

  DesapprouverTontine(tontine:any){
      
      return this.http.post<any>(`${url}admin/RefuseTontine/${tontine}`, tontine)
     
  }

  IntegrerTontine(tontine:any){
      return this.http.post(`${url}auth/ParticiperTontine`,tontine)
  }

  listeTontineByUsr(user:any){
      return this.http.get(`${url}createur_tontine/ListeTontineparCreateur/${user}`)
  }

  listeParticipantEnAttente(tontine:any){
      return this.http.get(`${url}createur_tontine/ListeparticipationEnattentePartontine/${tontine}`)
  }
  listeParticipantAccepte(tontine:any){
      return this.http.get(`${url}auth/ListeparticipationAcceptePartontine/${tontine}`)
  }

  ApprouverIntegration(user:any){
      return this.http.post(`${url}createur_tontine/AcceptedParticipationUser/${user}`,user)
  }
   
  DesapprouverIntegration(user:any){
      return this.http.post(`${url}createur_tontine/RefuseParticipationUser/${user}`,user)
  }
  
  listeTontineParPart(user:any){
    return this.http.get(`${url}participant_tontine/Tontineparticipe/${user}`)
  }

  participantTontine(tontine:any){
    return this.http.get(`${url}auth/ListeparticipationAcceptePartontine/${tontine}`)
  }
     
  }


