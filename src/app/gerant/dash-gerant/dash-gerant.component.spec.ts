import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGerantComponent } from './dash-gerant.component';
import { HttpClientModule } from '@angular/common/http';

describe('DashGerantComponent', () => {
  let component: DashGerantComponent;
  let fixture: ComponentFixture<DashGerantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashGerantComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(DashGerantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
