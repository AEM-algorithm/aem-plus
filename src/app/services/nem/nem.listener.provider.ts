import {Injectable} from '@angular/core';
import {Address, UnconfirmedTransactionListener, ConfirmedTransactionListener} from 'nem-library';
import { BehaviorSubject } from 'rxjs/Rx';

import { NemProvider } from '@app/services/nem/nem.provider';

export interface NemEvent {
  type: string;
  address: string;
}

@Injectable({providedIn: 'root'})
export class NemListenerProvider {

  public observeNemEvent: BehaviorSubject<NemEvent> = new BehaviorSubject(null);

  constructor(
    private nem: NemProvider,
  ) {
  }

  public listen(rawAddress: string) {
    const address = new Address(rawAddress);
    const nodes = [this.nem.node];

    const unconfirmedTransactionListener = new UnconfirmedTransactionListener(nodes).given(address);
    unconfirmedTransactionListener.subscribe(x => {
      this.observeNemEvent.next({
        type: 'unconfirmed',
        address: rawAddress,
      });
    }, err => {
      console.log('[NEM] unconfirmedTransactionListener', err);
    });

    const confirmedTransactionListener = new ConfirmedTransactionListener(nodes).given(address);
    confirmedTransactionListener.subscribe(x => {
      this.observeNemEvent.next({
        type: 'confirmed',
        address: rawAddress,
      });
    }, err => {
      console.log('[NEM] confirmedTransactionListener', err);
    });
  }
}
