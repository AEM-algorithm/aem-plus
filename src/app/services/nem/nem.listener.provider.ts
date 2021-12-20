import {Injectable} from '@angular/core';
import {Address, UnconfirmedTransactionListener, ConfirmedTransactionListener} from 'nem-library';
import { BehaviorSubject } from 'rxjs/Rx';

export interface NemEvent {
  type: string;
  address: string;
}

@Injectable({providedIn: 'root'})
export class NemListenerProvider {

  public observeNemEvent: BehaviorSubject<NemEvent> = new BehaviorSubject(null);

  constructor(
  ) {
  }

  public listen(rawAddress: string) {
    console.log('[NEM] start listen', rawAddress);
    const address = new Address(rawAddress);

    const unconfirmedTransactionListener = new UnconfirmedTransactionListener().given(address);
    unconfirmedTransactionListener.subscribe(x => {
      this.observeNemEvent.next({
        type: 'unconfirmed',
        address: rawAddress,
      });
    }, err => {
      console.log('[NEM] unconfirmedTransactionListener', err);
    });

    const confirmedTransactionListener = new ConfirmedTransactionListener().given(address);
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
