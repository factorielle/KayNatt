export class Tontine{
 idTontine:number=0;
 nomTontine:string='';
 nbrPart:string='';
 cotisation:string='';
 type:string='';
 dDebut:string='';
 dFin:string='';
 regle:string='';
 description:string='';
}

export class Cycle{
    idCycle:number=0;
    numero:string='';
    correspondance:string='';
    dButoir:string='';
    penalite:string='';
}

export class user{
    idUser:number=0;
    nom:string='';
    prenom:string='';
    adresse:string='';
    telephone:string='';
    nin:string='';
    email:string='';
    numProche:string='';
}