import { TestBed } from '@angular/core/testing';

import { DragTasksServiceService } from './drag-tasks-service.service';

describe('DragTasksServiceService', () => {
  let service: DragTasksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragTasksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
