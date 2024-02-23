import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCycleTontineComponent } from './liste-cycle-tontine.component';
import { DataTablesModule } from 'angular-datatables';

describe('ListeCycleTontineComponent', () => {
  let component: ListeCycleTontineComponent;
  let fixture: ComponentFixture<ListeCycleTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCycleTontineComponent],
      imports:[DataTablesModule]
    });
    fixture = TestBed.createComponent(ListeCycleTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
