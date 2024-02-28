import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTontineParticipantComponent } from './liste-tontine-participant.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

describe('ListeTontineParticipantComponent', () => {
  let component: ListeTontineParticipantComponent;
  let fixture: ComponentFixture<ListeTontineParticipantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeTontineParticipantComponent],
      imports: [RouterModule.forRoot([]), HttpClientModule],
      providers: [ActivatedRoute]
    });
    fixture = TestBed.createComponent(ListeTontineParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
