import { TestBed } from '@angular/core/testing';

import { TasksSignalService } from './tasks-signal.service';

describe('TasksSignalService', () => {
  let service: TasksSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
