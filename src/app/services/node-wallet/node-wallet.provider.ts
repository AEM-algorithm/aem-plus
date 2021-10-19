import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NodeWalletModel, NodeWalletType } from 'src/app/services/models/node-wallet.model';

@Injectable({ providedIn: 'root' })
export class NodeWalletProvider {
  constructor(
    private storage: Storage
  ) {
    this.storage.create();
  }

  public async getNodeWalletByWalletId(walletId): Promise<NodeWalletModel> {
    let node: NodeWalletModel;
    try {
      const nodeWallet = await this.getNodeWallet();
      if (nodeWallet && nodeWallet[walletId]) {
        node = nodeWallet[walletId];
      }
    }catch (e) {
      console.log('node-wallet.provider', 'getNodeWalletByWalletId', 'walletId', walletId, 'error', e);
    }
    return node;
  }

  public async updateNodeWallet(newNode: NodeWalletType) {
    const node = await this.getNodeWallet();
    const newNodeWallet = {
      ...node,
      ...newNode,
    };

    this.storage.set('nodeWallet', newNodeWallet);
  }

  public async getNodeWallet(): Promise<NodeWalletModel[]> {
    let nodes: NodeWalletModel[];
    try {
      const nodeWallet = await this.storage.get('nodeWallet');
      if (nodeWallet) {
        nodes = nodeWallet;
      }
    }catch (e) {
      console.log('node-wallet.provider', 'getNodeWallet', 'error', e);
    }
    return nodes;
  }
}
