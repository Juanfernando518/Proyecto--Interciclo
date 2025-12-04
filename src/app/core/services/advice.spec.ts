import { TestBed } from '@angular/core/testing';

import { Advice } from './advice';

describe('Advice', () => {
  let service: Advice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Advice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
