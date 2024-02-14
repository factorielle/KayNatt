import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../model/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CycleService {

  constructor(private http: HttpClient) {}
  
  gestionCycle(tontine:any, ){
    return this.http.post(`${url}createur_tontine/gererCycle/${tontine}`,tontine)

  }
  listeCycles(tontine:any):Observable<any>{
    return this.http.get<any>(`${url}auth/listeCycle/${tontine}`)
  }
  participerCycle(cycle:any, paiement:any){
    return this.http.post(`${url}auth/fairePaiement/${cycle}`, cycle,paiement);
  }
  faireTirage(tontine:any){
    return this.http.post(`${url}createur_tontine/faireTirage/${tontine}`, tontine)
  }
  listeCyclePart(idPart:any){
    return this.http.get(`${url}participant_tontine/ListeCycleParparticipant/${idPart}`)
  }
}

