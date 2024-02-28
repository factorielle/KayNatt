import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCycleTontineParticipantComponent } from './detail-cycle-tontine-participant.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('DetailCycleTontineParticipantComponent', () => {
  let component: DetailCycleTontineParticipantComponent;
  let fixture: ComponentFixture<DetailCycleTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCycleTontineParticipantComponent],
      imports: [
        HttpClientModule, RouterModule.forRoot([])
      ],
      providers: [{ provide: ActivatedRoute, useValue: ActivatedRoute }]
    });
    fixture = TestBed.createComponent(DetailCycleTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
