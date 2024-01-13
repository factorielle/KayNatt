import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCycleTontineParticipantComponent } from './liste-cycle-tontine-participant.component';

describe('ListeCycleTontineParticipantComponent', () => {
  let component: ListeCycleTontineParticipantComponent;
  let fixture: ComponentFixture<ListeCycleTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCycleTontineParticipantComponent]
    });
    fixture = TestBed.createComponent(ListeCycleTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
