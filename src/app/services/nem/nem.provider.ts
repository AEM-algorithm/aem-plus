import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import nem from 'nem-sdk';
import {
    Account,
    AccountHttp,
    AccountOwnedMosaicsService,
    Address,
    Mosaic, MosaicDefinition,
    MosaicHttp,
    MosaicService,
    MosaicTransferable,
    NemAnnounceResult,
    NEMLibrary,
    NetworkTypes,
    NodeHttp,
    Password,
    PlainMessage,
    QRService,
    ServerConfig,
    SimpleWallet,
    TimeWindow,
    Transaction,
    TransactionHttp,
    TransferTransaction,
    XEM
} from 'nem-library';

import { Observable } from 'nem-library/node_modules/rxjs';

import { NodeWalletProvider } from 'src/app/services/node-wallet/node-wallet.provider';

import { NEM_DEFAULT_NODE_TEST_NET } from 'src/app/config/nem-network.config';

const REQUEST_TIMEOUT = 5000;

/*
 Generated class for the BitcoinProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable({ providedIn: 'root' })
export class NemProvider {
    public node: ServerConfig = NEM_DEFAULT_NODE_TEST_NET;
    public isNodeAlive: boolean = false;
    accountHttp: AccountHttp;
    mosaicHttp: MosaicHttp;
    transactionHttp: TransactionHttp;
    nodeHttp: NodeHttp;
    qrService: QRService;
    accountOwnedMosaicsService: AccountOwnedMosaicsService;
    xem: MosaicDefinition;

    constructor(
      private storage: Storage,
      private nodeWallet: NodeWalletProvider,
    ) {
        NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

        this.qrService = new QRService();

        this.updateNodeStatus();
        setInterval(() => this.updateNodeStatus(), 2500);
    }

    public async setNodeNEMWallet(walletId: string) {
        try {
            const nodeWallet = await this.nodeWallet.getNodeWalletByWalletId(walletId);
            if (nodeWallet) {
                this.setNode(nodeWallet.selectedNode);
            } else {
                this.setNode(this.node);
            }
        }catch (e) {
            this.setNode(this.node);
            console.log('nem.provider' , 'setNodeNEMWallet()', 'error', e);
        }
        console.log('node-nem', this.node);
    }

    /**
     * Sets custom node for requests
     * @param node
     */
    public setNode(node: ServerConfig) {
        this.node = node;
        this.mosaicHttp = new MosaicHttp([this.node]);
        this.transactionHttp = new TransactionHttp([this.node]);
        this.accountHttp = new AccountHttp([this.node]);
        this.accountOwnedMosaicsService = new AccountOwnedMosaicsService(this.accountHttp, this.mosaicHttp);
        this.nodeHttp = new NodeHttp([this.node]);
    }

    /**
     * Create simple wallet by a given mnemonic
     * @param walletName
     * @param mnemonic
     * @param password
     */
    public createMnemonicWallet(walletName: string, mnemonic: string, password: string): SimpleWallet {
        // TODO: change to create simple wallet algorithm
        const privateKey = nem.crypto.helpers.derivePassSha(mnemonic, 6000).priv;
        return SimpleWallet.createWithPrivateKey(walletName, new Password(password), privateKey);
    }

    /**
     * Create simple wallet by a given private key
     * @param walletName
     * @param privateKey
     * @param password
     */
    public createPrivateKeyWallet(walletName: string, privateKey: string, password: string): SimpleWallet {
        return SimpleWallet.createWithPrivateKey(walletName, new Password(password), privateKey);
    }

    /**
     * Gets private key from password and account
     * @param password
     * @param wallet
     * @return promise with selected wallet
     */
    public passwordToPrivateKey(password: string, wallet: SimpleWallet): string {
        return wallet.unlockPrivateKey(new Password(password));
    }

    /**
     * Generate Address QR Text
     * @param address address
     * @return Address QR Text
     */
    public generateAddressQRText(address: Address): string {
        return this.qrService.generateAddressQRText(address);
    }

    /**
     * Generate Address QR Text
     * @param address address
     * @param amount
     * @param message
     * @return Address QR Text
     */
    public generateInvoiceQRText(address: Address, amount: number, message: string): string {
        return JSON.stringify({
            data: {
                addr: address.plain(),
                amount: amount,
                msg: message
            }
        });
    }

    /**
     * Get mosaics form an account
     * @param address address to check balance
     * @return Promise with mosaics information
     */
    public getBalance(address: Address): Promise<MosaicTransferable[]> {
        return this.accountOwnedMosaicsService.fromAddress(address).timeout(REQUEST_TIMEOUT).toPromise();
    }

    /**
     * Get xem balance form an account
     * @param address address to check balance
     * @return Promise with mosaics information
     */
    public async getXEMBalance(rawAddress: string): Promise<number> {
        const address = new Address(rawAddress);
        const balances = await this.getBalance(address);
        let XEMBalance = 0;
        balances.forEach(mosaic => {
            if (mosaic.mosaicId.description() == 'nem:xem') {
                XEMBalance = mosaic.amount;
            }
        });
        return XEMBalance;
    }

    /**
     * Formats levy given mosaic object
     * @param mosaic mosaic object
     * @return Promise with levy fee formated
     */
    public formatLevy(mosaic: MosaicTransferable): Promise<number> {
        let mosaicService = new MosaicService(new MosaicHttp());
        return mosaicService.calculateLevy(mosaic).toPromise();
    }

    /**
     * Check if acount belongs it is valid, has 40 characters and belongs to network
     * @param address address to check
     * @return Return prepared transaction
     */
    public isValidAddress(address: Address): boolean {

        // Reset recipient data
        let success = true;
        // From documentation: Addresses have always a length of 40 characters.
        if (!address || address.plain().length != 40) {
            success = false;
        }

        //if raw data, clean address and check if it is from network
        if (address.network() != NEMLibrary.getNetworkType()) {
            success = false;
        }
        return success;

    }

    /**
     * Prepares xem transaction
     * @param recipientAddress recipientAddress
     * @param amount amount
     * @param message message
     * @return Return transfer transaction
     */
    public prepareTransaction(recipientAddress: Address, amount: number, message: string): TransferTransaction {
        return TransferTransaction.create(TimeWindow.createWithDeadline(), recipientAddress, new XEM(amount), PlainMessage.create(message));
    }

    /**
     * Prepares mosaic transaction
     * @param recipientAddress recipientAddress
     * @param mosaicsTransferable mosaicsTransferable
     * @param message message
     * @return Promise containing prepared transaction
     */
    public prepareMosaicTransaction(recipientAddress: Address, mosaicsTransferable: MosaicTransferable[], message: string): TransferTransaction {
        return TransferTransaction.createWithMosaics(TimeWindow.createWithDeadline(), recipientAddress, mosaicsTransferable, PlainMessage.create(message));
    }

    /**
     * Send transaction into the blockchain
     * @param transferTransaction transferTransaction
     * @param password wallet
     * @param password password
     * @return Promise containing sent transaction
     */
    public confirmTransaction(transferTransaction: TransferTransaction, wallet: SimpleWallet, password: string): Observable<NemAnnounceResult> {
        let account = wallet.open(new Password(password));
        let signedTransaction = account.signTransaction(transferTransaction);
        return this.transactionHttp.announceTransaction(signedTransaction);
    }

    /**
     * Adds to a transaction data mosaic definitions
     * @param mosaics array of mosaics
     * @return Promise with altered transaction
     */
    public getMosaicsDefinition(mosaics: Mosaic[]): Observable<MosaicTransferable[]> {
        return Observable.from(mosaics)
            .flatMap((mosaic: Mosaic) => {
                if (XEM.MOSAICID.equals(mosaic.mosaicId)) {
                    return Observable.of(new XEM(mosaic.quantity / Math.pow(10, XEM.DIVISIBILITY)));
                } else {
                    return this.mosaicHttp.getMosaicDefinition(mosaic.mosaicId).map(mosaicDefinition => {
                        return MosaicTransferable.createWithMosaicDefinition(mosaicDefinition, mosaic.quantity / Math.pow(10, mosaicDefinition.properties.divisibility));
                    });
                }
            })
            .toArray();
    }

    /**
     * Get all confirmed transactions of an account
     * @param address account Address
     * @return Promise with account transactions
     */
    public getFirstTransactionsFromAnAccount(address: Address): Promise<Transaction[]> {
        return new Promise<Transaction[]>((resolve, reject) => {
            let returnTx = [];
            let pageable = this.accountHttp.allTransactions(address, { pageSize: 100 });
            pageable.timeout(REQUEST_TIMEOUT).subscribe(transactions => {
                returnTx.push(...transactions);
            }, err => {
                console.log(err);
                reject('Error getting transactions');
            }, () => {
                resolve(returnTx.filter(_ => _ instanceof TransferTransaction));
            });
        });
    }

    /**
     * Get all confirmed transactions of an account
     * @param address account Address
     * @return Promise with account transactions
     */
    public async getAllTransactionsFromAnAccount(address: Address): Promise<Transaction[]> {
        const allTransactions: Transaction[] = [];
        let transactions = await this.accountHttp.allTransactions(address, { pageSize: 100 }).timeout(REQUEST_TIMEOUT).toPromise();
        while (transactions.length > 0) {
            allTransactions.push(...transactions);

            transactions = await this.accountHttp.allTransactions(address, {
                pageSize: 100,
                id: allTransactions[allTransactions.length - 1].getTransactionInfo().id
            }).timeout(REQUEST_TIMEOUT).toPromise();
        }

        return allTransactions.filter(_ => _ instanceof TransferTransaction);
    }

    /**
     * Get all unconfirmed transactions of an account
     * @param address account Address
     * @return Promise with account transactions
     */
    public getUnconfirmedTransactionsFromAnAccount(address: Address): Observable<Transaction[]> {
        return this.accountHttp.unconfirmedTransactions(address).timeout(REQUEST_TIMEOUT);
    }

    /**
     * @return Promise with node status
     */
    public checkNodeIsAlive(): Promise<boolean> {
        return new Promise(resolve => {
            const route = this.node.protocol + '://' + this.node.domain + ':' + this.node.port + '/heartbeat';
            setTimeout(function () {
                resolve(false)
            }, REQUEST_TIMEOUT);
            fetch(route, { method: 'GET' }).then(res => {
                res.json().then(json => {
                    resolve(json.message === 'ok');
                }).catch(e => {
                    resolve(false);
                });
            }).catch(e => {
                resolve(false);
            });
        });
    }

    /**
     * Updates node status info
     */
    private updateNodeStatus() {
        this.checkNodeIsAlive().then(alive => {
            this.isNodeAlive = alive;
        });
    }

    /**
     * Checks if private key is valid
     * @param privateKey
     */
    public isValidPrivateKey(privateKey: string): boolean {
        if (!privateKey) return false;
        if (privateKey.length != 64 && !(privateKey.length == 66 && privateKey.startsWith('00'))) return false;
        try {
            Account.createWithPrivateKey(privateKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}
