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

  walletNode: NodeWalletModel;
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

  async setSavedWalletNode(walletNode: NodeWalletModel) {
    if (walletNode) {
      this.walletNode = walletNode;
    } else {
      this.walletNode = {nodes: [], selectedNode: environment.SYMBOL_NODE_DEFAULT};
    }
  }

  async

  async initNode() {
    const walletNode = await this.nodeWallet.getNodeWalletByWalletId(this.walletId);
    const nodes = await this.getSymbolNodes(walletNode);
    this.setNodes(nodes);
    const selectedNode = await this.getSymbolSelectedNode(walletNode);
    this.setSelectedNode(selectedNode);
    this.setSavedWalletNode(walletNode);
  }

  private async getSymbolNodes(nodeWallet: NodeWalletModel): Promise<string[]> {
    if (nodeWallet) {
      return (nodeWallet.nodes, environment.SYMBOL_NODES) as string[];
    } else {
      return environment.SYMBOL_NODES as string[];
    }
  }

  private async getSymbolSelectedNode(nodeWallet: NodeWalletModel): Promise<string> {
    if (nodeWallet) {
      return this.nodes.find((value: string) => value === nodeWallet.selectedNode);
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

    if (this.walletNode && this.walletNode.nodes) this.walletNode.nodes.unshift(nodeUrl);
    else this.walletNode.nodes = [nodeUrl];

    await this.updateNodeWallet(this.walletNode.nodes, nodeUrl);
    await this.initNode();

    this.setCustomHost(undefined);
    this.setCustomPort(3000);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    this.symbol.setNodeSymbolWallet(this.walletId);
    this.updateNodeWallet(this.walletNode.nodes, this.selectedNode);
    this.modalCtrl.dismiss();
  }

  async updateNodeWallet(nodes: string[], selectedNode: string) {
    const newNode: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(nodes, selectedNode)
    };
    await this.nodeWallet.updateNodeWallet(newNode);
  }
}
