import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTontineGerantComponent } from './liste-tontine-gerant.component';

describe('ListeTontineGerantComponent', () => {
  let component: ListeTontineGerantComponent;
  let fixture: ComponentFixture<ListeTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTontineGerantComponent]
    });
    fixture = TestBed.createComponent(ListeTontineGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
