import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { ServerConfig } from 'nem-library';

import { NemProvider } from 'src/app/services/nem/nem.provider';
import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';
import { NodeWalletModel, NodeWalletType } from 'src/app/services/models/node-wallet.model';

// TODO config NODE Env
import { NEM_NODES_TEST_NET, NEM_DEFAULT_NODE_TEST_NET } from 'src/app/config/nem-network.config';

@Component({
  selector: 'app-nem-node-selection',
  templateUrl: './nem-node-selection.component.html',
  styleUrls: ['./nem-node-selection.component.scss'],
})
export class NemNodeSelectionComponent implements OnInit {
  @Input() walletId: string;

  nodes: ServerConfig[];
  selectedNode: ServerConfig;
  customHost: string;
  customPort: number;

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private nem: NemProvider,
    private nodeWallet: NodeWalletProvider,
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
    this.customPort = port;
  }

  async initNode() {
    const nodeWallet = await this.nodeWallet.getNodeWalletByWalletId(this.walletId);
    const nodes = await this.getNemNodes(nodeWallet);
    const selectedNode = await this.getNemSelectedNode(nodeWallet);
    this.setNodes(nodes);
    this.setSelectedNode(selectedNode);
  }

  async getNemNodes(nodeWallet: NodeWalletModel): Promise<ServerConfig[]> {
    if (nodeWallet) {
      return nodeWallet.nodes;
    } else {
      return NEM_NODES_TEST_NET;
    }
  }

  async getNemSelectedNode(nodeWallet: NodeWalletModel): Promise<ServerConfig> {
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

    await this.updateNodeWallet(this.nodes, this.selectedNode);

    this.selectedNode = this.nodes[this.nodes.length - 1];

    this.setCustomHost(undefined);
    this.setCustomPort(undefined);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  confirmNode() {
    this.nem.setNode(this.selectedNode);
    this.updateNodeWallet(this.nodes, this.selectedNode);
    this.modalCtrl.dismiss();
  }

  async updateNodeWallet(nodes: ServerConfig[], selectedNode: ServerConfig) {
    const newNode: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(nodes, selectedNode)
    };
    await this.nodeWallet.updateNodeWallet(newNode);
  }
}
