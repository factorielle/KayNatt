import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCycleTontineGerantComponent } from './detail-cycle-tontine-gerant.component';
import { ActivatedRoute } from '@angular/router';

describe('DetailCycleTontineGerantComponent', () => {
  let component: DetailCycleTontineGerantComponent;
  let fixture: ComponentFixture<DetailCycleTontineGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCycleTontineGerantComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DetailCycleTontineGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
