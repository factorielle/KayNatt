import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCycleTontineGerantComponent } from './liste-cycle-tontine-gerant.component';

describe('ListeCycleTontineGerantComponent', () => {
  let component: ListeCycleTontineGerantComponent;
  let fixture: ComponentFixture<ListeCycleTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCycleTontineGerantComponent]
    });
    fixture = TestBed.createComponent(ListeCycleTontineGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
