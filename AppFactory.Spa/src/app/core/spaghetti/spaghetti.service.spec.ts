import { TestBed } from '@angular/core/testing';

import { SpaghettiService } from './spaghetti.service';

describe('SpaghettiService', () => {
  let service: SpaghettiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaghettiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
