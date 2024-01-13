import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashParticipantComponent } from './dash-participant.component';

describe('DashParticipantComponent', () => {
  let component: DashParticipantComponent;
  let fixture: ComponentFixture<DashParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashParticipantComponent]
    });
    fixture = TestBed.createComponent(DashParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
