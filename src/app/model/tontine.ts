export class Tontine{
 id:number=0;
 libelle:string='';
 nbrPart:string='';
 montant:string='';
 periode:string='';
 date_de_debut:string='';
 duree:string='';
 regle:string='';
 description:string='';
 etat:string='';
 statutTontine:string='';
}

export class Cycle{
    idCycle:number=0;
    numero:string='';
    correspondance:string='';
    dButoir:string='';
    penalite:string='';
}

export class User{
    idUser:number=0;
    nom:string='';
    prenom:string='';
    adresse:string='';
    telephone:string='';
    nin:string='';
    email:string='';
    numProche:string='';
}