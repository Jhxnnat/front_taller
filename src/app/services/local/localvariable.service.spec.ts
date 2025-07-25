import { TestBed } from '@angular/core/testing';

import { LocalvariableService } from './localvariable.service';

describe('LocalvariableService', () => {
  let service: LocalvariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalvariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
