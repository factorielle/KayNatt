import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAccueilComponent } from './dash-accueil.component';
import { DataTablesModule } from 'angular-datatables';

describe('DashAccueilComponent', () => {
  let component: DashAccueilComponent;
  let fixture: ComponentFixture<DashAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashAccueilComponent],
      imports:[DataTablesModule]
    });
    fixture = TestBed.createComponent(DashAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
