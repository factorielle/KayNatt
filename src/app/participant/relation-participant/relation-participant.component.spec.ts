import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationParticipantComponent } from './relation-participant.component';

describe('RelationParticipantComponent', () => {
  let component: RelationParticipantComponent;
  let fixture: ComponentFixture<RelationParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationParticipantComponent]
    });
    fixture = TestBed.createComponent(RelationParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
