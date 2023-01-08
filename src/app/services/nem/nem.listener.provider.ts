import { Injectable } from '@angular/core';
import {
  Address,
  UnconfirmedTransactionListener,
  ConfirmedTransactionListener,
  ServerConfig,
} from 'nem-library';
import nem from 'nem-sdk';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { NemProvider } from '@app/services/nem/nem.provider';

export interface NemEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class NemListenerProvider {
  public observeNemEvent: BehaviorSubject<NemEvent> = new BehaviorSubject(null);

  constructor(private nemProvider: NemProvider) {}

  getWSNodes(): ServerConfig[] {
    const nemNode = this.nemProvider.node;
    const node = {
      protocol: nemNode.protocol,
      domain: nemNode.domain,
      port: nem.model.nodes.websocketPort || nemNode.port,
    };
    return [node];
  }

  public listen(rawAddress: string) {
    const address = new Address(rawAddress);
    const nodes = this.getWSNodes();

    const unconfirmedTransactionListener = new UnconfirmedTransactionListener(
      nodes
    ).given(address);
    unconfirmedTransactionListener.subscribe(
      (x) => {
        this.observeNemEvent.next({
          type: 'unconfirmed',
          address: rawAddress,
        });
      },
      (err) => {
        console.log('[NEM] unconfirmedTransactionListener', err);
      }
    );

    const confirmedTransactionListener = new ConfirmedTransactionListener(
      nodes
    ).given(address);
    confirmedTransactionListener.subscribe(
      (x) => {
        this.observeNemEvent.next({
          type: 'confirmed',
          address: rawAddress,
        });
      },
      (err) => {
        console.log('[NEM] confirmedTransactionListener', err);
      }
    );
  }
}
