import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUserComponent } from './detail-user.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('DetailUserComponent', () => {
  let component: DetailUserComponent;
  let fixture: ComponentFixture<DetailUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailUserComponent],
      imports: [RouterModule.forRoot([])],
      providers: [ { provide: ActivatedRoute, useValue: {} }]
    });
    fixture = TestBed.createComponent(DetailUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
