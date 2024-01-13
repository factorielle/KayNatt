import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTontineComponent } from './gestion-tontine.component';

describe('GestionTontineComponent', () => {
  let component: GestionTontineComponent;
  let fixture: ComponentFixture<GestionTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTontineComponent]
    });
    fixture = TestBed.createComponent(GestionTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
