import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineGerantComponent } from './detail-tontine-gerant.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('DetailTontineGerantComponent', () => {
  let component: DetailTontineGerantComponent;
  let fixture: ComponentFixture<DetailTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineGerantComponent, HttpClientModule],
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
