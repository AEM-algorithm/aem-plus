import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Address } from 'bitcore-lib';

export interface BitcoinEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class BitcoinListenerProvider {
  public observeBitcoinEvent: BehaviorSubject<
    BitcoinEvent
  > = new BehaviorSubject(null);
  private bitcoinListener;
  constructor() {}

  public async listen(rawAddress: string) {}
}
