import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGerantComponent } from './dash-gerant.component';

describe('DashGerantComponent', () => {
  let component: DashGerantComponent;
  let fixture: ComponentFixture<DashGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashGerantComponent]
    });
    fixture = TestBed.createComponent(DashGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
