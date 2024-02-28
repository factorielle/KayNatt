import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/header-footer/header/header.component';
import { AccueilComponent } from './accueil.component';
import { HttpClientModule } from '@angular/common/http';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilComponent],
      imports:[HttpClientModule]
    });
    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
