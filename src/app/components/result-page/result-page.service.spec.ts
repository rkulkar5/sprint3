import { TestBed } from '@angular/core/testing';

import { ResultPageService } from './result-page.service';

describe('ResultPageService', () => {
  let service: ResultPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
