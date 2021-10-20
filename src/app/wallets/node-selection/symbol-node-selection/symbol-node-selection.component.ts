import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';
import { NodeWalletModel, NodeWalletType } from 'src/app/services/models/node-wallet.model';
import { ToastProvider } from 'src/app/services/toast/toast.provider';

import { environment } from 'src/environments/environment';

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
    private toast: ToastProvider,
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
      return environment.SYMBOL_NODES;
    }
  }

  async getSymbolSelectedNode(nodeWallet: NodeWalletModel): Promise<string> {
    if (nodeWallet) {
      return nodeWallet.nodes.find((value: string) => value === nodeWallet.selectedNode);
    } else {
      return environment.SYMBOL_NODE_DEFAULT;
    }
  }

  isValidNode(): boolean {
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
    if (!this.isValidNode()) {
      this.toast.showErrorEnterNodeInvalid();
      return;
    }

    const nodeUrl = `http://${this.customHost}:${this.customPort}`;
    this.nodes.push(nodeUrl);

    await this.updateNodeWallet(this.nodes, this.selectedNode);

    this.selectedNode = this.nodes[this.nodes.length - 1];

    this.setCustomHost(undefined);
    this.setCustomPort(3000);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    this.symbol.setNode(this.selectedNode);
    this.updateNodeWallet(this.nodes, this.selectedNode);
    this.modalCtrl.dismiss();
  }

  async updateNodeWallet(nodes: string[], selectedNode: string) {
    const newNode: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(nodes, selectedNode)
    };
    await this.nodeWallet.updateNodeWallet(newNode);
  }
}
