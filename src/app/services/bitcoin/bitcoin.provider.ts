import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { entropyToMnemonic, mnemonicToSeed, mnemonicToSeedSync } from 'bip39';
import { bip32, Network, networks, payments } from 'bitcoinjs-lib';
import { PrivateKey, Address, Transaction, Networks } from 'bitcore-lib';
import { WalletProvider } from '../wallets/wallet.provider';
import { getBalance } from 'blockchain.info/blockexplorer';
import { Insight } from 'bitcore-explorers';
import mempoolJS from "@mempool/mempool.js";

const REQUEST_TIMEOUT = 5000;
const TESTNET = networks.testnet;
export interface BitcoinSimpleWallet {
    encryptedWIF: string,
    address: string
}

export interface BitcoinTransaction {
    time: number,
    incoming: boolean,
    sendingAddress: string,
    receivingAddress: string,
    fee: number,
    amount: number,
    hash: string,
    confirmations: number,
}

export interface TransactionInfo {
    incomming: boolean,
    address: string,
    amount: number,
}

@Injectable({ providedIn: 'root' })
export class BitcoinProvider {
    public MAINNET_PATH = "m/44'/0'/0'/0/0";
    public TESTNET_PATH = "m/44'/1'/0'/0/0";
    //public node: ServerConfig = {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890};
    public isNodeAlive: boolean = false;
    public btcApis;
    constructor(private storage: Storage, public http: HttpClient) {
        const mempool = mempoolJS({
            hostname: 'mempool.space',
            network: 'testnet'
        });

        this.btcApis = mempool.bitcoin;
    }

    /**
     * Create simple wallet by a given mnemonic
     * @param walletName
     * @param mnemonic
     * @param password
     */
    public createMnemonicWallet(mnemonic: string, password: string, isMainNet: boolean = false): BitcoinSimpleWallet {
        mnemonic = entropyToMnemonic(mnemonic);
        const network = isMainNet ? networks.bitcoin : networks.testnet;
        const seedBuffer = mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seedBuffer, network);
        const wallet = root.derivePath(isMainNet ? this.MAINNET_PATH : this.TESTNET_PATH);

        const pk = new PrivateKey(wallet.privateKey.toString('hex'));

        const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
        return {
            encryptedWIF: encryptedPk,
            address: payments.p2pkh({ pubkey: wallet.publicKey, network }).address
        } as BitcoinSimpleWallet
    }

    public createPrivateKeyWallet(privateKey: string, password: string): BitcoinSimpleWallet {
        const pk = new PrivateKey(privateKey);
        const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
        return {
            encryptedWIF: encryptedPk,
            address: pk.toAddress().toString()
        } as BitcoinSimpleWallet
    }

    /**
     * Gets private key from password and account
     * @param password
     * @param wallet
     * @return promise with selected wallet
     */
    public passwordToPrivateKey(password: string, wallet: BitcoinSimpleWallet): PrivateKey {
        return PrivateKey.fromWIF(WalletProvider.decrypt(wallet.encryptedWIF, password));
    }

    /**
     * Generate Address QR Text
     * @param address address
     * @return Address QR Text
     */
    public generateAddressQRText(address: Address): string {
        return address.toString();
        return JSON.stringify({
            data: {
                addr: address.toString(),
                name: 'wallet',
            }
        });
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
                addr: address.toString(),
                amount: amount,
                msg: message
            }
        });
    }

    /**
     * Get btc balance from an account
     * @param address address to check balance
     * @param network network of the address to check balance
     * @return Promise with mosaics information
     */
    public async getBTCBalance(rawAddress: string, network: string): Promise<number> {
        const address = new Address(rawAddress);
        if (!this.isValidAddress(address, network)) return null;
        if (network === 'livenet') {
            const data = await getBalance(address.toString());
            return data[address]['final_balance'] / Math.pow(10, 8);
        } else {
            // // Option 1: Use Blockcypher API
            // const data: any = await this.http.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}`).toPromise();
            // return data.balance / Math.pow(10, 8);

            // Option 2: Use Mempool from Mempool.space
            const data: any = await this.btcApis.addresses.getAddress({ address });
            const balance = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
            return balance / Math.pow(10, 8);
        }
    }

    /**
     * Check if account belongs it is valid, has 40 characters and belongs to network
     * @param address address to check
     * @param network network of the address to check
     * @return Return prepared transaction
     */
    public isValidAddress(address: Address, network: string): boolean {
        return Address.isValid(address.toString(), network)
    }


    /**
     * Get network of an Bitcoin address
     * @param address address to check network
     * @return Bitcoin network
     */

    public getNetwork(rawAddress: string): string {
        const network = (rawAddress.startsWith('1') || rawAddress.startsWith('3')) ? networks.bitcoin : networks.testnet;
        return network === networks.bitcoin ? 'livenet' : 'testnet';
    }

    /**
     * Prepares xem transaction
     * @param recipientAddress recipientAddress
     * @param amount amount
     * @param wallet
     * @param password
     * @return Return transfer transaction
     */
    public async sendTransaction(recipientAddress: Address, amount: number, wallet: BitcoinSimpleWallet, password: string) {
        const privateKey = this.passwordToPrivateKey(password, wallet);

        const insight = new Insight('mainnet');
        const utxos: any = await this.http.get(`https://api.blockcypher.com/v1/btc/main/addrs/${wallet.address}?unspentOnly=true&includeScript=true`).toPromise();
        let totalAmountAvailable = 0;
        const inputs = [];
        utxos.txrefs.forEach((element) => {
            inputs.push({
                satoshis: element.value,
                script: element.script,
                address: wallet.address,
                txId: element.tx_hash,
                outputIndex: element.tx_output_n,
            });
            totalAmountAvailable += element.value;
        });
        const fee = await this.calculateFee();
        const tx = new Transaction()
            .from(inputs)
            .to(recipientAddress.toString(), Math.floor(amount * Math.pow(10, 8)))
            .change(wallet.address)
            .fee(fee)
            .sign(privateKey)
            .serialize();
        await this.http.post("https://api.blockcypher.com/v1/btc/main/txs/push", { tx }).toPromise();
    }

    /**
     * Get all confirmed transactions of an account
     * @param address account Address
     * @param network network of the account
     * @return Promise with account transactions
     */
    public async getAllTransactionsFromAnAccount(rawAddress: string, network: string): Promise<BitcoinTransaction[]> {
        const address = new Address(rawAddress);
        const isMainnet = network === 'livenet'
        const networkPath = isMainnet ? 'main' : 'test3'
        if (!this.isValidAddress(address, network)) return null;
        const lastBlockInfo = await this.http.get(`https://api.blockcypher.com/v1/btc/${networkPath}`).toPromise();
        const lastBlockIndex = parseInt(lastBlockInfo['height']);

        const url = isMainnet ? 'https://blockchain.info/multiaddr?active=' + address.toString() + '&cors=true'
            : `https://api.blockcypher.com/v1/btc/test3/addrs/${address.toString()}`;
        let response
        if (isMainnet) {
            response = await this.http.get(url).toPromise();
        } else {
            response = await this.btcApis.addresses.getAddressTxsChain({ address });
        }
        console.log("transaction data", response);

        const transactions: BitcoinTransaction[] = [];
        if (isMainnet) {
            response['txs'].forEach(tx => {
                let included = false;
                tx.out.forEach(out => {
                    const incoming = tx.result >= 0;
                    if ((incoming && out.addr == address.toString()) || (!incoming && out.addr != address.toString())) {
                        included = true;
                        transactions.push({
                            time: tx.time * 1000,
                            incoming: incoming,
                            sendingAddress: null,
                            receivingAddress: incoming && tx.inputs[0] ? tx.inputs[0].prev_out.addr : out.addr,
                            fee: tx.fee / Math.pow(10, 8),
                            amount: out.value / Math.pow(10, 8),
                            hash: tx.hash,
                            confirmations: tx.block_height != undefined ? lastBlockIndex - tx.block_height : 0,
                        });
                    }
                });
                if (!included) {
                    transactions.push({
                        time: tx.time * 1000,
                        incoming: true,
                        sendingAddress: null,
                        receivingAddress: address.toString(),
                        fee: tx.fee / Math.pow(10, 8),
                        amount: Math.abs(tx.result / Math.pow(10, 8)),
                        hash: tx.hash,
                        confirmations: tx.block_height != undefined ? lastBlockIndex - tx.block_height : 0,
                    })
                }
            });
        } else {
            // Reference: https://www.blockcypher.com/dev/bitcoin/#txref
            // Reference: https://mempool.space/testnet/api
            response.forEach(tx => {
                let included = false;
                const sendingTxInfo = this.parseInnerTx(tx.vin, address.toString());
                const receivingTxInfo = this.parseInnerTx(tx.vout, address.toString());
                const incoming = sendingTxInfo.incomming && receivingTxInfo.incomming;
                const amount = incoming ? receivingTxInfo.amount : receivingTxInfo.amount;
                const time = tx.status.confirmed ? new Date(tx.status.block_time).getTime() : 0;
                if (tx.confirmations > 0) {
                    included = true;
                    transactions.push({
                        time: time * 1000,
                        incoming: incoming,
                        sendingAddress: incoming ? tx.vin[0].prevout.scriptpubkey_address : sendingTxInfo.address,
                        receivingAddress: incoming ? receivingTxInfo.address : tx.vout[0].scriptpubkey_address,
                        fee: Math.abs(tx.fee / Math.pow(10, 8)),
                        amount: Math.abs(amount / Math.pow(10, 8)),
                        hash: tx.txid,
                        confirmations: tx.status.confirmed ? lastBlockIndex - tx.status.block_height : 0,
                    });
                }
                if (!included) {
                    transactions.push({
                        time: time * 1000,
                        incoming: incoming,
                        sendingAddress: incoming ? tx.vin[0].prevout.scriptpubkey_address : sendingTxInfo.address,
                        receivingAddress: incoming ? receivingTxInfo.address : tx.vout[0].scriptpubkey_address,
                        fee: Math.abs(tx.fee / Math.pow(10, 8)),
                        amount: Math.abs(amount / Math.pow(10, 8)),
                        hash: tx.txid,
                        confirmations: tx.status.confirmed ? lastBlockIndex - tx.status.block_height : 0,
                    })
                }
            });
        }
        return transactions;
    }

    private parseInnerTx(transactionsInfo: any[], walletAddress: string): TransactionInfo {
        let incomming = true;
        let address: string;
        let amount: number;
        transactionsInfo.forEach(info => {
            if (info.prevout) {
                if (info.prevout.scriptpubkey_address === walletAddress) {
                    incomming = false;
                    address = walletAddress;
                    amount = info.prevout.value;
                };
            } else {
                if (info.scriptpubkey_address === walletAddress) {
                    incomming = true;
                    address = walletAddress;
                    amount = info.value;
                }
            }
        })
        return {
            incomming: incomming,
            address: address, // TODO: recheck this data
            amount: amount,
        } as TransactionInfo
    }

    public async calculateFee(): Promise<number> {
        return new Promise<number>(resolve => {
            fetch('https://bitcoinfees.earn.com/api/v1/fees/recommended')
                .then((res => res.json()))
                .then((out) => {
                    resolve(out.halfHourFee * 226);
                }).catch(err => resolve(0));
        });
    }

    public isValidPrivateKey(privateKey: string): boolean {
        return PrivateKey.isValid(privateKey, 'livenet');
    }
}
