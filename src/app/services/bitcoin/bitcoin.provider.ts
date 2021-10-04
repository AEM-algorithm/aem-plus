import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { entropyToMnemonic, mnemonicToSeed, mnemonicToSeedSync } from 'bip39';
import { bip32 } from 'bitcoinjs-lib';
import { PrivateKey, Address, Transaction } from 'bitcore-lib';
import { WalletProvider } from '../wallets/wallet.provider';
import { getBalance } from 'blockchain.info/blockexplorer';
import { Insight } from 'bitcore-explorers';

const REQUEST_TIMEOUT = 5000;

export interface BitcoinWallet {
    encryptedWIF: string,
    address: string
}

export interface BitcoinTransaction {
    time: number,
    incoming: boolean,
    address: string,
    fee: number,
    amount: number,
    hash: string,
    confirmations: number,
}

@Injectable({ providedIn: 'root' })
export class BitcoinProvider {
    public path = "m/44'/0'/0'/0/0";
    //public node: ServerConfig = {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890};
    public isNodeAlive: boolean = false;

    constructor(private storage: Storage, public http: HttpClient) {
    }

    /**
     * Create simple wallet by a given mnemonic
     * @param walletName
     * @param mnemonic
     * @param password
     */
    public createMnemonicWallet(mnemonic: string, password: string): BitcoinWallet {
        mnemonic = entropyToMnemonic(mnemonic);
        const seedBuffer = mnemonicToSeedSync(mnemonic);
        const root = bip32.fromSeed(seedBuffer);
        const wallet = root.derivePath(this.path);

        const pk = new PrivateKey(wallet.privateKey.toString('hex'));

        const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
        return {
            encryptedWIF: encryptedPk,
            address: pk.toAddress().toString()
        } as BitcoinWallet
    }

    public createPrivateKeyWallet(privateKey: string, password: string): BitcoinWallet {
        const pk = new PrivateKey(privateKey);
        const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
        return {
            encryptedWIF: encryptedPk,
            address: pk.toAddress().toString()
        } as BitcoinWallet
    }

    /**
     * Gets private key from password and account
     * @param password
     * @param wallet
     * @return promise with selected wallet
     */
    public passwordToPrivateKey(password: string, wallet: BitcoinWallet): PrivateKey {
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
     * Get xem balance form an account
     * @param address address to check balance
     * @return Promise with mosaics information
     */
    public async getBTCBalance(address: Address): Promise<number> {
        const data = await getBalance(address.toString() + '&cors=true');
        return data[address]['final_balance'] / Math.pow(10, 8);
    }

    /**
     * Check if acount belongs it is valid, has 40 characters and belongs to network
     * @param address address to check
     * @return Return prepared transaction
     */
    public isValidAddress(address: Address): boolean {
        return Address.isValid(address.toString())
    }

    /**
     * Prepares xem transaction
     * @param recipientAddress recipientAddress
     * @param amount amount
     * @param wallet
     * @param password
     * @return Return transfer transaction
     */
    public async sendTransaction(recipientAddress: Address, amount: number, wallet: BitcoinWallet, password: string) {
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
     * @return Promise with account transactions
     */
    public async getAllTransactionsFromAnAccount(address: Address): Promise<BitcoinTransaction[]> {
        const lastBlockInfo = await this.http.get('https://api.blockcypher.com/v1/btc/main').toPromise();
        const lastBlockIndex = parseInt(lastBlockInfo['height']);

        const url = 'https://blockchain.info/multiaddr?active=' + address.toString() + '&cors=true';
        const response = await this.http.get(url).toPromise();

        const transactions: BitcoinTransaction[] = [];
        response['txs'].forEach(tx => {
            let included = false;
            tx.out.forEach(out => {
                const incoming = tx.result >= 0;
                if ((incoming && out.addr == address.toString()) || (!incoming && out.addr != address.toString())) {
                    included = true;
                    transactions.push({
                        time: tx.time * 1000,
                        incoming: incoming,
                        address: incoming && tx.inputs[0] ? tx.inputs[0].prev_out.addr : out.addr,
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
                    address: address.toString(),
                    fee: tx.fee / Math.pow(10, 8),
                    amount: Math.abs(tx.result / Math.pow(10, 8)),
                    hash: tx.hash,
                    confirmations: tx.block_height != undefined ? lastBlockIndex - tx.block_height : 0,
                })
            }
        });
        return transactions;
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
