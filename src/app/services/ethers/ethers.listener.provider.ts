import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import * as ethers from 'ethers';

import { EthersProvider } from '@app/services/ethers/ethers.provider';

export interface EthersEvent {
  type: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class EthersListenerProvider {
  public observeEthersEvent: BehaviorSubject<EthersEvent> = new BehaviorSubject(null);
  private socket: ethers.ethers.providers.InfuraWebSocketProvider;

  constructor(private ethersProvider: EthersProvider) {}

  public listen(address: string) {
    this.socket = ethers.providers.InfuraProvider.getWebSocketProvider(this.ethersProvider.network);
    this.socket.on('pending',  (txHash) => {
      this.listenReceiveConfirmedEvent(txHash, address);
    });
  }

  private async listenReceiveConfirmedEvent(hash: string, address: string) {
    try {
      const pendingTx = await this.ethersProvider.getTransactionResponseByTxHash(hash);
      if (pendingTx?.to === address) {
        this.socket.removeAllListeners();
        const confirmedTx = await pendingTx.wait();
        this.observeEthersEvent.next({
          type: 'confirmed',
          address: confirmedTx.to,
        });
      }
    }catch (e) {
      this.socket.removeAllListeners();
      console.log('listenReceiveConfirmedEvent', e);
    }
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
