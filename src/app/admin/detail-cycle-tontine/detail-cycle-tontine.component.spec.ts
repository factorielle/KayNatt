import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCycleTontineComponent } from './detail-cycle-tontine.component';

describe('DetailCycleTontineComponent', () => {
  let component: DetailCycleTontineComponent;
  let fixture: ComponentFixture<DetailCycleTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCycleTontineComponent]
    });
    fixture = TestBed.createComponent(DetailCycleTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
