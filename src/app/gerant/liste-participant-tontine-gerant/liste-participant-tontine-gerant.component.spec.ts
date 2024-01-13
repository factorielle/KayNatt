import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipantTontineGerantComponent } from './liste-participant-tontine-gerant.component';

describe('ListeParticipantTontineGerantComponent', () => {
  let component: ListeParticipantTontineGerantComponent;
  let fixture: ComponentFixture<ListeParticipantTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeParticipantTontineGerantComponent]
    });
    fixture = TestBed.createComponent(ListeParticipantTontineGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
