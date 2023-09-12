import { TestBed } from '@angular/core/testing';

import { ResetPasswordRouteGuardService } from './reset-password-route-guard.service';

describe('ResetPasswordRouteGuardService', () => {
  let service: ResetPasswordRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
