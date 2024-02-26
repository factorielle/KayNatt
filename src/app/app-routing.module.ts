import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './user/accueil/accueil.component';
import { PolitiqueComponent } from './user/politique/politique.component';
import { ConditionComponent } from './user/condition/condition.component';
import { ContactComponent } from './user/contact/contact.component';
import { DetailTontineComponent } from './user/detail-tontine/detail-tontine.component';
import { DashParticipantComponent } from './participant/dash-participant/dash-participant.component';
import { DetailCycleTontineParticipantComponent } from './participant/detail-cycle-tontine-participant/detail-cycle-tontine-participant.component';
import { ListeTontineParticipantComponent } from './participant/liste-tontine-participant/liste-tontine-participant.component';
import { RelationParticipantComponent } from './participant/relation-participant/relation-participant.component';
import { ListeCycleTontineParticipantComponent } from './participant/liste-cycle-tontine-participant/liste-cycle-tontine-participant.component';
import { DetailTontineParticipantComponent } from './participant/detail-tontine-participant/detail-tontine-participant.component';
import { DashGerantComponent } from './gerant/dash-gerant/dash-gerant.component';
import { RelationGerantComponent } from './gerant/relation-gerant/relation-gerant.component';
import { ListeTontineGerantComponent } from './gerant/liste-tontine-gerant/liste-tontine-gerant.component';
import { ListeParticipantTontineGerantComponent } from './gerant/liste-participant-tontine-gerant/liste-participant-tontine-gerant.component';
import { PaiementComponent } from './gerant/paiement/paiement.component';
import { ListeCycleTontineGerantComponent } from './gerant/liste-cycle-tontine-gerant/liste-cycle-tontine-gerant.component';
import { DetailTontineGerantComponent } from './gerant/detail-tontine-gerant/detail-tontine-gerant.component';
import { DetailCycleTontineGerantComponent } from './gerant/detail-cycle-tontine-gerant/detail-cycle-tontine-gerant.component';
import { AssistanceComponent } from './admin/assistance/assistance.component';
import { DashAccueilComponent } from './admin/dash-accueil/dash-accueil.component';
import { DetailCycleTontineComponent } from './admin/detail-cycle-tontine/detail-cycle-tontine.component';
import { DetailUserComponent } from './admin/detail-user/detail-user.component';
import { GestionRoleComponent } from './admin/gestion-role/gestion-role.component';
import { GestionTontineComponent } from './admin/gestion-tontine/gestion-tontine.component';
import { GestionUserComponent } from './admin/gestion-user/gestion-user.component';
import { ListeCycleTontineComponent } from './admin/liste-cycle-tontine/liste-cycle-tontine.component';
import { ListeParticipantTontineComponent } from './admin/liste-participant-tontine/liste-participant-tontine.component';
import { DetailTontineAdminComponent } from './admin/detail-tontine-admin/detail-tontine-admin.component';
import { ErreurComponent } from './erreur/erreur/erreur.component';
import { adminGuardGuard } from './garde/admin-guard.guard';

const routes: Routes = [
  {path:'auth', component:LoginComponent},
  // route pour les composant dans le dossier user

  {path:'', component:AccueilComponent},
  {path:'accueil', component:AccueilComponent},
  {path:'politique', component:PolitiqueComponent},
  {path:'condition', component:ConditionComponent},
  {path:'contact', component:ContactComponent},
  {path:'detailTontine/:id', component:DetailTontineComponent},
  // route pour les composant dans le dossier participant
  {path:'dashboardPart', component:DashParticipantComponent, canActivate:[adminGuardGuard]},
  {path:'cyclesPart/:idTontine/detailCyclePart/:idcycle', component:DetailCycleTontineParticipantComponent},
  {path:'tontinesPart/:id', component:ListeTontineParticipantComponent},
  {path:'relationPart', component:RelationParticipantComponent},
  {path:'cyclesPart/:id', component:ListeCycleTontineParticipantComponent},
  {path:'detailTontinePart/:id', component:DetailTontineParticipantComponent},
  // route pour les composant dans le dossier gerant
  {path:'dashboardGerant', component:DashGerantComponent, canActivate:[adminGuardGuard]},
  {path:'relationGerant', component:RelationGerantComponent , canActivate:[adminGuardGuard]},
  {path:'tontinesGerant', component:ListeTontineGerantComponent , canActivate:[adminGuardGuard]},
  {path:'participantTontinesGerant/:id', component:ListeParticipantTontineGerantComponent , canActivate:[adminGuardGuard]},
  {path:'profil', component:PaiementComponent , canActivate:[adminGuardGuard]},
  {path:'cycleTontineGerant/:id', component:ListeCycleTontineGerantComponent , canActivate:[adminGuardGuard]},
  {path:'detailTontineGerant/:id', component:DetailTontineGerantComponent , canActivate:[adminGuardGuard]},
  {path:'cycles/:idTontine/detailcycleGerant/:idcycle', component:DetailCycleTontineGerantComponent , canActivate:[adminGuardGuard]},
  // route pour les composant dans le dossier admin
  {path:'assistance', component:AssistanceComponent},
  {path:'accueilAdmin', component:DashAccueilComponent, canActivate:[adminGuardGuard]},
  {path:'cycles/:idTontine/detailCycleAdmin/:idCycle', component:DetailCycleTontineComponent , canActivate:[adminGuardGuard]},
  {path:'detailUser/:id', component:DetailUserComponent , canActivate:[adminGuardGuard]},
  {path:'role', component:GestionRoleComponent , canActivate:[adminGuardGuard]},
  {path:'gestionTontine', component:GestionTontineComponent , canActivate:[adminGuardGuard]},
  {path:'users', component:GestionUserComponent, canActivate:[adminGuardGuard]},
  {path:'cycles/:id', component:ListeCycleTontineComponent , canActivate:[adminGuardGuard]},
  {path:'participantTontine/:id', component:ListeParticipantTontineComponent , canActivate:[adminGuardGuard]},
  {path:'detailTontineAdmin/:id', component:DetailTontineAdminComponent , canActivate:[adminGuardGuard]},
  // 404 not found
  {path:'**', component:ErreurComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
