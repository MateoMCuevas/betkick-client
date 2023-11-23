import { TestBed } from '@angular/core/testing';

import { MoneyUserService } from './money-user.service';

describe('MoneyUserService', () => {
  let service: MoneyUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
