import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineGerantComponent } from './detail-tontine-gerant.component';
import { ActivatedRoute } from '@angular/router';

describe('DetailTontineGerantComponent', () => {
  let component: DetailTontineGerantComponent;
  let fixture: ComponentFixture<DetailTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineGerantComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DetailTontineGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
