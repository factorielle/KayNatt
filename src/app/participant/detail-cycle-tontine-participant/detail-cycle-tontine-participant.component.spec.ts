import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCycleTontineParticipantComponent } from './detail-cycle-tontine-participant.component';

describe('DetailCycleTontineParticipantComponent', () => {
  let component: DetailCycleTontineParticipantComponent;
  let fixture: ComponentFixture<DetailCycleTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCycleTontineParticipantComponent]
    });
    fixture = TestBed.createComponent(DetailCycleTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
