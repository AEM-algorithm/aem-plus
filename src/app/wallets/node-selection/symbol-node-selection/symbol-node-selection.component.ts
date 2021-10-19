import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';
import { NodeWalletModel, NodeWalletType } from 'src/app/services/models/node-wallet.model';

// TODO config NODE Env
import { SYMBOL_DEFAULT_NODE_TEST_NET, SYMBOL_NODES_TEST_NET } from 'src/app/config/symbol-network.config';

@Component({
  selector: 'app-symbol-node-selection',
  templateUrl: './symbol-node-selection.component.html',
  styleUrls: ['./symbol-node-selection.component.scss'],
})
export class SymbolNodeSelectionComponent implements OnInit {
  @Input() walletId: string;

  nodes: string[];
  selectedNode: string;
  customHost: string;
  customPort: number;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private symbol: SymbolProvider,
    private nodeWallet: NodeWalletProvider,
  ) {
  }

  ngOnInit() {
    this.initNode();
  }

  setNodes(nodes: string[]) {
    this.nodes = nodes;
  }

  setSelectedNode(selectedNode: string) {
    this.selectedNode = selectedNode;
  }

  setCustomHost(host) {
    this.customHost = host;
  }

  setCustomPort(port) {
    this.customPort = port;
  }

  async initNode() {
    const nodeWallet = await this.nodeWallet.getNodeWalletByWalletId(this.walletId);
    const nodes = await this.getSymbolNodes(nodeWallet);
    const selectedNode = await this.getSymbolSelectedNode(nodeWallet);
    this.setNodes(nodes);
    this.setSelectedNode(selectedNode);
  }

  async getSymbolNodes(nodeWallet: NodeWalletModel): Promise<string[]> {
    if (nodeWallet) {
      return nodeWallet.nodes;
    } else {
      return SYMBOL_NODES_TEST_NET;
    }
  }

  async getSymbolSelectedNode(nodeWallet: NodeWalletModel): Promise<string> {
    if (nodeWallet) {
      return nodeWallet.nodes.find((value: string) => value === nodeWallet.selectedNode);
    } else {
      return SYMBOL_DEFAULT_NODE_TEST_NET;
    }
  }

  isValidHostPort(): boolean {
    try {
      return !(
        !this.customHost ||
        !this.customPort ||
        this.customPort > 65999 ||
        this.customPort <= 0 ||
        this.customHost.includes(' ')
      );
    }catch (e) {
      return false;
    }
  }

  onChangeNode(e) {
    if (e.target?.value) {
      this.selectedNode = e.target.value;
    }
  }

  async addCustomNode() {
    const node = `http://${this.customHost}:${this.customPort}`;
    this.nodes.push(node);
    this.selectedNode = this.nodes[this.nodes.length - 1];

    this.setCustomHost(undefined);
    this.setCustomPort(3000);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async confirmNode() {
    this.symbol.setNode(this.selectedNode);

    const node: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(this.nodes, this.selectedNode)
    };
    await this.nodeWallet.updateNodeWallet(node);

    this.modalCtrl.dismiss();
  }
}
