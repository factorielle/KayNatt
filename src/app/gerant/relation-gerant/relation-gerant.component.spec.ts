import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationGerantComponent } from './relation-gerant.component';

describe('RelationGerantComponent', () => {
  let component: RelationGerantComponent;
  let fixture: ComponentFixture<RelationGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelationGerantComponent]
    });
    fixture = TestBed.createComponent(RelationGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
