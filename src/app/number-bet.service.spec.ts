import { TestBed } from '@angular/core/testing';

import { NumberBetService } from './number-bet.service';

describe('NumberBetService', () => {
  let service: NumberBetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberBetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
