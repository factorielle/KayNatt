import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineComponent } from './detail-tontine.component';

describe('DetailTontineComponent', () => {
  let component: DetailTontineComponent;
  let fixture: ComponentFixture<DetailTontineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineComponent]
    });
    fixture = TestBed.createComponent(DetailTontineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
