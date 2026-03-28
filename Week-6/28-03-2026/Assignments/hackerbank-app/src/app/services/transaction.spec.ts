import { TestBed } from '@angular/core/testing';

import { Transaction, TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});