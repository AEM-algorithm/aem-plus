import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ServerConfig } from 'nem-library';

import { NemProvider } from 'src/app/services/nem/nem.provider';
import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';
import { NodeWalletModel, NodeWalletType } from 'src/app/services/models/node-wallet.model';
import { ToastProvider } from 'src/app/services/toast/toast.provider';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nem-node-selection',
  templateUrl: './nem-node-selection.component.html',
  styleUrls: ['./nem-node-selection.component.scss'],
})
export class NemNodeSelectionComponent implements OnInit {
  @Input() walletId: string;

  walletNode: NodeWalletModel;
  nodes: ServerConfig[];
  selectedNode: ServerConfig;
  customHost: string;
  customPort: number;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private nem: NemProvider,
    private nodeWallet: NodeWalletProvider,
    private toast: ToastProvider,
  ) {
  }

  ngOnInit() {
    this.initNode();
  }

  setNodes(nodes: ServerConfig[]) {
    this.nodes = nodes;
  }

  setSelectedNode(selectedNode: ServerConfig) {
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
      this.walletNode = {nodes: [], selectedNode: environment.NEM_NODE_DEFAULT};
    }
  }

  async initNode() {
    const walletNode = await this.nodeWallet.getNodeWalletByWalletId(this.walletId);
    const nodes = await this.getNemNodes(walletNode);
    this.setNodes(nodes);
    const selectedNode = await this.getNemSelectedNode(walletNode);
    this.setSelectedNode(selectedNode);
    this.setSavedWalletNode(walletNode);
  }

  private async getNemNodes(nodeWallet: NodeWalletModel): Promise<ServerConfig[]> {
    if (nodeWallet) {
      return (nodeWallet.nodes, environment.NEM_NODES) as ServerConfig[];
    } else {
      return environment.NEM_NODES as ServerConfig[];
    }
  }

  private async getNemSelectedNode(nodeWallet: NodeWalletModel): Promise<ServerConfig> {
    if (nodeWallet) {
      return this.nodes.find((value: ServerConfig) =>
        JSON.stringify(value) === JSON.stringify(nodeWallet.selectedNode)
      ) as ServerConfig;
    } else {
      return environment.NEM_NODES.find((value) =>
        JSON.stringify(value) === JSON.stringify(environment.NEM_NODE_DEFAULT)
      ) as ServerConfig;
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
    const customNode = {
      protocol: 'http',
      domain: this.customHost,
      port: this.customPort
    } as ServerConfig;

    if (this.walletNode && this.walletNode.nodes) this.walletNode.nodes.unshift(customNode);
    else this.walletNode.nodes = [customNode];

    await this.updateNodeWallet(this.walletNode.nodes, customNode);
    this.setNodes((this.walletNode.nodes, environment.NEM_NODES as ServerConfig[]));

    this.setCustomHost(undefined);
    this.setCustomPort(undefined);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    this.nem.setNodeNEMWallet(this.walletId);
    this.updateNodeWallet(this.walletNode.nodes, this.selectedNode);
    this.modalCtrl.dismiss();
  }

  async updateNodeWallet(nodes: ServerConfig[], selectedNode: ServerConfig) {
    const newNode: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(nodes, selectedNode)
    };
    await this.nodeWallet.updateNodeWallet(newNode);
  }
}
