import { TestBed } from '@angular/core/testing';

import { CustomToastrServiceService } from './custom-toastr-service.service';

describe('CustomToastrServiceService', () => {
  let service: CustomToastrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomToastrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
