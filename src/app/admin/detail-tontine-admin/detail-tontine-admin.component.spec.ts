import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailTontineAdminComponent } from './detail-tontine-admin.component';
import { ActivatedRoute } from '@angular/router';

describe('DetailTontineAdminComponent', () => {
  let component: DetailTontineAdminComponent;
  let fixture: ComponentFixture<DetailTontineAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineAdminComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    fixture = TestBed.createComponent(DetailTontineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
