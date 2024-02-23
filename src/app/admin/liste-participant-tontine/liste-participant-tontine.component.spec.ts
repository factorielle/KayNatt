import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipantTontineComponent } from './liste-participant-tontine.component';
import { DataTablesModule } from 'angular-datatables';

describe('ListeParticipantTontineComponent', () => {
  let component: ListeParticipantTontineComponent;
  let fixture: ComponentFixture<ListeParticipantTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeParticipantTontineComponent],
      imports:[DataTablesModule]
    });
    fixture = TestBed.createComponent(ListeParticipantTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
