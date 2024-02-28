import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionTontineComponent } from './gestion-tontine.component';
import { DataTablesModule } from 'angular-datatables';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('GestionTontineComponent', () => {
  let component: GestionTontineComponent;
  let fixture: ComponentFixture<GestionTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionTontineComponent],
      imports:[DataTablesModule, HttpClientModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(GestionTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
