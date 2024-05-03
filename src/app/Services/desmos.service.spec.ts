import { TestBed } from '@angular/core/testing';

import { DesmosService } from './desmos.service';

describe('DesmosService', () => {
  let service: DesmosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesmosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
