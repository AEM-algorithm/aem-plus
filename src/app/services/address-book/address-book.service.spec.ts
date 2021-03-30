import { TestBed } from '@angular/core/testing';

import { AddressBookService } from './address-book.service';

describe('AddressBookService', () => {
  let service: AddressBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
