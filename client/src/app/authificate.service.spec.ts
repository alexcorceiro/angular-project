import { TestBed } from '@angular/core/testing';

import { AuthificateService } from './authificate.service';

describe('AuthificateService', () => {
  let service: AuthificateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthificateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
