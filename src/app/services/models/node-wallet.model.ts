export class NodeWalletModel {
  constructor(public nodes: any[], public selectedNode: any) {}
}

export interface NodeWalletType {
  [key: string]: NodeWalletModel;
}
