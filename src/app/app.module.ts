import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './user/accueil/accueil.component';
import { DashAccueilComponent } from './admin/dash-accueil/dash-accueil.component';
import { DashGerantComponent } from './gerant/dash-gerant/dash-gerant.component';
import { DashParticipantComponent } from './participant/dash-participant/dash-participant.component';
import { ContactComponent } from './user/contact/contact.component';
import { PolitiqueComponent } from './user/politique/politique.component';
import { ConditionComponent } from './user/condition/condition.component';
import { DetailTontineComponent } from './user/detail-tontine/detail-tontine.component';
import { ListeTontineParticipantComponent } from './participant/liste-tontine-participant/liste-tontine-participant.component';
import { DetailTontineParticipantComponent } from './participant/detail-tontine-participant/detail-tontine-participant.component';
import { ListeCycleTontineParticipantComponent } from './participant/liste-cycle-tontine-participant/liste-cycle-tontine-participant.component';
import { DetailCycleTontineParticipantComponent } from './participant/detail-cycle-tontine-participant/detail-cycle-tontine-participant.component';
import { RelationParticipantComponent } from './participant/relation-participant/relation-participant.component';
import { ListeTontineGerantComponent } from './gerant/liste-tontine-gerant/liste-tontine-gerant.component';
import { DetailTontineGerantComponent } from './gerant/detail-tontine-gerant/detail-tontine-gerant.component';
import { ListeParticipantTontineGerantComponent } from './gerant/liste-participant-tontine-gerant/liste-participant-tontine-gerant.component';
import { ListeCycleTontineGerantComponent } from './gerant/liste-cycle-tontine-gerant/liste-cycle-tontine-gerant.component';
import { DetailCycleTontineGerantComponent } from './gerant/detail-cycle-tontine-gerant/detail-cycle-tontine-gerant.component';
import { RelationGerantComponent } from './gerant/relation-gerant/relation-gerant.component';
import { PaiementComponent } from './gerant/paiement/paiement.component';
import { GestionUserComponent } from './admin/gestion-user/gestion-user.component';
import { DetailUserComponent } from './admin/detail-user/detail-user.component';
import { GestionTontineComponent } from './admin/gestion-tontine/gestion-tontine.component';
import { ListeParticipantTontineComponent } from './admin/liste-participant-tontine/liste-participant-tontine.component';
import { ListeCycleTontineComponent } from './admin/liste-cycle-tontine/liste-cycle-tontine.component';
import { DetailCycleTontineComponent } from './admin/detail-cycle-tontine/detail-cycle-tontine.component';
import { AssistanceComponent } from './admin/assistance/assistance.component';
import { GestionRoleComponent } from './admin/gestion-role/gestion-role.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header-footer/header/header.component';
import { FooterComponent } from './header-footer/footer/footer.component';
import { DetailTontineAdminComponent } from './admin/detail-tontine-admin/detail-tontine-admin.component';
import { ErreurComponent } from './erreur/erreur/erreur.component';
import { TokenInterceptorProvider } from './intercepteur/intercepteur.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    DashAccueilComponent,
    DashGerantComponent,
    DashParticipantComponent,
    ContactComponent,
    PolitiqueComponent,
    ConditionComponent,
    DetailTontineComponent,
    ListeTontineParticipantComponent,
    DetailTontineParticipantComponent,
    ListeCycleTontineParticipantComponent,
    DetailCycleTontineParticipantComponent,
    RelationParticipantComponent,
    ListeTontineGerantComponent,
    DetailTontineGerantComponent,
    ListeParticipantTontineGerantComponent,
    ListeCycleTontineGerantComponent,
    DetailCycleTontineGerantComponent,
    RelationGerantComponent,
    PaiementComponent,
    GestionUserComponent,
    DetailUserComponent,
    GestionTontineComponent,
    ListeParticipantTontineComponent,
    ListeCycleTontineComponent,
    DetailCycleTontineComponent,
    AssistanceComponent,
    GestionRoleComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DetailTontineAdminComponent,
    ErreurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
