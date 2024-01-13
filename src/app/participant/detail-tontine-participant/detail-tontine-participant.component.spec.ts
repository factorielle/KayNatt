import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineParticipantComponent } from './detail-tontine-participant.component';

describe('DetailTontineParticipantComponent', () => {
  let component: DetailTontineParticipantComponent;
  let fixture: ComponentFixture<DetailTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineParticipantComponent]
    });
    fixture = TestBed.createComponent(DetailTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
