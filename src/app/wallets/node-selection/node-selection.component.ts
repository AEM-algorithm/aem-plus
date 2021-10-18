import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ServerConfig } from 'nem-library';

import { NemProvider } from 'src/app/services/nem/nem.provider';
import { WalletNodeModel } from 'src/app/services/models/wallet-node.model';

// TODO config NODE Env
import { NEM_NODES_TEST_NET, NEM_DEFAULT_NODE_TEST_NET } from 'src/app/config/nem-network.config';

@Component({
  selector: 'app-node-selection',
  templateUrl: './node-selection.component.html',
  styleUrls: ['./node-selection.component.scss'],
})
export class NodeSelectionComponent implements OnInit {
  @Input() walletId: string;

  nodes: ServerConfig[];
  selectedNode: ServerConfig;
  customHost: string;
  customPort: number;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private nem: NemProvider
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
    console.log(this.selectedNode);
  }

  setCustomHost(host) {
    this.customHost = host;
  }

  setCustomPort(port) {
    this.customHost = port;
  }

  async initNode() {
    const nodeWallet = await this.nem.getNodeWalletByWalletId(this.walletId);
    const nodes = await this.getNemNodes(nodeWallet);
    const selectedNode = await this.getNemSelectedNode(nodeWallet);
    this.setNodes(nodes);
    this.setSelectedNode(selectedNode);
  }

  async getNemNodes(nodeWallet: WalletNodeModel): Promise<ServerConfig[]> {
    if (nodeWallet) {
      return nodeWallet.nodes;
    } else {
      return NEM_NODES_TEST_NET;
    }
  }

  async getNemSelectedNode(nodeWallet: WalletNodeModel): Promise<ServerConfig> {
    if (nodeWallet) {
      return nodeWallet.nodes.find((value: ServerConfig) => value.domain === nodeWallet.selectedNode.domain
      && value.port === nodeWallet.selectedNode.port);
    } else {
      return NEM_DEFAULT_NODE_TEST_NET;
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
    this.nodes.push({
      protocol: 'http',
      domain: this.customHost,
      port: this.customPort
    });
    this.selectedNode = this.nodes[this.nodes.length - 1];

    this.setCustomHost(undefined);
    this.setCustomPort(undefined);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    if (this.nem.node !== this.selectedNode) {
      this.nem.setNode(this.selectedNode);
      this.storage.set('nodeWallet', {
        [this.walletId]: new WalletNodeModel(this.nodes, this.selectedNode)
      });
    }
    this.modalCtrl.dismiss();
  }
}
