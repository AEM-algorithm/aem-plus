import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx';
import * as ethers from 'ethers';

import { EthersProvider } from '@app/services/ethers/ethers.provider';

export interface EthersEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class EthersListenerProvider {
  public observeEthersEvent: BehaviorSubject<EthersEvent> = new BehaviorSubject(null);

  constructor(private ethersProvider: EthersProvider) {}

  public listen(rawAddress: string) {
    const socket = ethers.providers.InfuraProvider.getWebSocketProvider(this.ethersProvider.network);
    // TODO listener receive even .
    // console.log('socket', socket);
    // socket.on('block', (block) => {
    //   console.log('ETH' , 'block', block);
    // });

    // this.ethersProvider.provider.on('block', (blockNumber) => {
    //   // Emitted on every block change
    //   console.log('ETH' , 'blockNumber', blockNumber);
    //   this.getBlock(blockNumber);
    // });
    //
    // this.ethersProvider.provider.on('pending', (tx) => {
    //   // Emitted when any new pending transaction is noticed
    //   console.log('ETH' , 'tx', tx);
    // });
    //
    //
    // this.ethersProvider.provider.on('error', (tx) => {
    //   // Emitted when any error occurs
    //   console.log('ETH' , 'tx', tx);
    // });

  }

  public waitForTransaction(txs: any) {
    try {
      this.ethersProvider.provider.waitForTransaction(txs.hash).then(() => {
        this.observeEthersEvent.next({
          type: 'confirmed',
          address: txs.from,
        });
      });
    }catch (e) {
      console.log('ETH', 'waitForTransaction', e);
    }
  }
}
