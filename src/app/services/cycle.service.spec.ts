import { TestBed } from '@angular/core/testing';

import { CycleService } from './cycle.service';
import { HttpClientModule } from '@angular/common/http';

describe('CycleService', () => {
  let service: CycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(CycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
