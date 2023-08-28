import { Component, Input, OnInit } from '@angular/core';

import { ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';
import {
  NodeWalletModel,
  NodeWalletType,
} from 'src/app/services/models/node-wallet.model';
import { ToastProvider } from 'src/app/services/toast/toast.provider';

import { environment } from 'src/environments/environment';
import { AlertProvider } from '@app/services/alert/alert.provider';
import { UtilsService } from '@app/services/helper/utils.service';
import { HttpClient } from '@angular/common/http';

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
    private alert: AlertProvider,
    private loadingCtrl: LoadingController,
    private utils: UtilsService,
    private httpClient: HttpClient
  ) { }

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
      this.walletNode = {
        nodes: [],
        selectedNode: environment.SYMBOL_NODE_DEFAULT,
      };
    }
  }

  async initNode() {
    const walletNode = await this.nodeWallet.getNodeWalletByWalletId(
      this.walletId
    );
    const nodes = await this.getSymbolNodes(walletNode);
    this.setNodes(nodes);
    const selectedNode = await this.getSymbolSelectedNode(walletNode);
    this.setSelectedNode(selectedNode);
    this.setSavedWalletNode(walletNode);
  }

  private async getSymbolNodes(nodeWallet: NodeWalletModel): Promise<string[]> {
    try {
      let response = await this.httpClient.get(`https://nodewatch.symbol.tools/api/symbol/nodes/peer`, {}).toPromise() as any;
      let listNode = [];
      response.forEach(element => {
        if (element.endpoint) {
          listNode.push(element.endpoint)
        }
      });
      return listNode;
    } catch (error) {
      return environment.SYMBOL_NODES as string[];
    }

  }

  private async getSymbolSelectedNode(
    nodeWallet: NodeWalletModel
  ): Promise<string> {
    if (nodeWallet) {
      return this.nodes.find(
        (value: string) => value === nodeWallet.selectedNode
      );
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
    } catch (e) {
      return false;
    }
  }

  onChangeNode(e) {
    if (e.target?.value) {
      this.selectedNode = e.target.value;
    }
  }

  async addCustomNode() {
    const domain = this.utils.getNodeUrl(this.customHost);
    if (!this.isValidNode() || !domain) {
      this.toast.showErrorEnterNodeInvalid();
      return;
    }

    const nodeUrl = `http://${domain}:${this.customPort}`;

    if (this.nodes.find((node) => node === nodeUrl)) {
      this.toast.showWarningCommonNode();
      return;
    }

    if (this.walletNode && this.walletNode.nodes)
      this.walletNode.nodes.unshift(nodeUrl);
    else this.walletNode.nodes = [nodeUrl];

    await this.updateNodeWallet(this.walletNode.nodes, nodeUrl);
    this.nodes.unshift(nodeUrl);

    this.setCustomHost(undefined);
    this.setCustomPort(undefined);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  public async confirmNode() {
    const loading = await this.loadingCtrl.create({
      message: 'Checking node status...',
      spinner: 'circles',
    });
    await loading.present();
    try {
      const isNodeValid = await this.symbol.checkNodeIsAlive(this.selectedNode);
      loading.dismiss();
      if (!isNodeValid) return this.alert.showInvalidNode();

    } catch (err) {
      console.log(err);
    }

    this.symbol.setNodeSymbolWallet(this.walletId);
    this.updateNodeWallet(this.walletNode.nodes, this.selectedNode);
    this.modalCtrl.dismiss();
  }

  async updateNodeWallet(nodes: string[], selectedNode: string) {
    const newNode: NodeWalletType = {
      [this.walletId]: new NodeWalletModel(nodes, selectedNode),
    };
    console.log('newNode ', newNode)
    await this.nodeWallet.updateNodeWallet(newNode);
  }
}
