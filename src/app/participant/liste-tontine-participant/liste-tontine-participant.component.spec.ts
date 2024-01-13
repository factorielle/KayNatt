import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTontineParticipantComponent } from './liste-tontine-participant.component';

describe('ListeTontineParticipantComponent', () => {
  let component: ListeTontineParticipantComponent;
  let fixture: ComponentFixture<ListeTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTontineParticipantComponent]
    });
    fixture = TestBed.createComponent(ListeTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
