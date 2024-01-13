import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTontineAdminComponent } from './detail-tontine-admin.component';

describe('DetailTontineAdminComponent', () => {
  let component: DetailTontineAdminComponent;
  let fixture: ComponentFixture<DetailTontineAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailTontineAdminComponent]
    });
    fixture = TestBed.createComponent(DetailTontineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
