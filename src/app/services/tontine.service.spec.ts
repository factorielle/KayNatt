import { TestBed } from '@angular/core/testing';

import { TontineService } from './tontine.service';
import { HttpClientModule } from '@angular/common/http';

describe('TontineService', () => {
  let service: TontineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [TontineService]
    });
    service = TestBed.inject(TontineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
