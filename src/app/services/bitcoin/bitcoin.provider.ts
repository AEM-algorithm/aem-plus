import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { entropyToMnemonic, mnemonicToSeed, mnemonicToSeedSync } from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import {
  PrivateKey,
  Address,
  Transaction,
  Networks,
  PublicKey,
} from 'bitcore-lib';
import { WalletProvider } from '../wallets/wallet.provider';
import { getBalance } from 'blockchain.info/blockexplorer';
import { Insight } from 'bitcore-explorers';
import moment from 'moment';

import { HelperFunService } from '@app/services/helper/helper-fun.service';
import { ExportTransactionModel } from '@app/services/models/export-transaction.model';

import mempoolJS from '@mempool/mempool.js';

import { environment } from '@environments/environment';

const REQUEST_TIMEOUT = 5000;
const MAINET = bitcoin.networks.bitcoin;
const TESTNET = bitcoin.networks.testnet;
export interface BitcoinSimpleWallet {
  encryptedWIF: string;
  address: string;
}

export interface BitcoinTransaction {
  time: number;
  incoming: boolean;
  sendingAddress: string;
  receivingAddress: string;
  fee: number;
  amount: number;
  hash: string;
  confirmations: number;
}

export interface TransactionInfo {
  incomming: boolean;
  address: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class BitcoinProvider {
  public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';
  public MAINNET_PATH = "m/44'/0'/0'/0/0";
  public TESTNET_PATH = "m/44'/1'/0'/0/0";
  public DEFAULT_ACCOUNT_PATH = this.isMainNet
    ? this.MAINNET_PATH
    : this.TESTNET_PATH;
  public mempoolNetwork = this.isMainNet ? 'mainet' : 'testnet';
  public bitcoinNetwork = this.isMainNet
    ? bitcoin.networks.bitcoin
    : bitcoin.networks.testnet;
  public bitcoreNetwork = this.isMainNet ? Networks.mainnet : Networks.testnet;

  public BITCOIN_API = 'https://api.blockcypher.com/v1/btc';
  //public node: ServerConfig = {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890};
  public isNodeAlive: boolean = false;
  public btcApis;
  constructor(
    private storage: Storage,
    public http: HttpClient,
    private helperService: HelperFunService
  ) {
    const mempool = mempoolJS({
      hostname: 'mempool.space',
      network: this.mempoolNetwork,
    });

    this.btcApis = mempool.bitcoin;
  }

  /**
   * Create simple wallet by a given mnemonic
   * @param walletName
   * @param mnemonic
   * @param password
   */
  public createMnemonicWallet(
    mnemonic: string,
    password: string
  ): BitcoinSimpleWallet {
    mnemonic = entropyToMnemonic(mnemonic);
    const seedBuffer = mnemonicToSeedSync(mnemonic);
    const root = bitcoin.bip32.fromSeed(seedBuffer, this.bitcoinNetwork);
    const wallet = root.derivePath(this.DEFAULT_ACCOUNT_PATH);

    const pk = new PrivateKey(wallet.privateKey.toString('hex'));

    const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
    return {
      encryptedWIF: encryptedPk,
      address: bitcoin.payments.p2pkh({
        pubkey: wallet.publicKey,
        network: this.bitcoinNetwork,
      }).address,
    } as BitcoinSimpleWallet;
  }

  public createPrivateKeyWallet(
    privateKey: string,
    password: string
  ): BitcoinSimpleWallet {
    const pk = new PrivateKey(privateKey, this.bitcoreNetwork);
    const encryptedPk = WalletProvider.encrypt(pk.toWIF(), password);
    return {
      encryptedWIF: encryptedPk,
      address: pk.toAddress().toString(),
    } as BitcoinSimpleWallet;
  }

  public createMultisigWallet(
    privateKey: string,
    cosignaturesPublicKey: string[],
    password: string
  ): BitcoinSimpleWallet {
    const pubKeys = cosignaturesPublicKey.map((hex) => Buffer.from(hex, 'hex'));
    const pay2Multisig = bitcoin.payments.p2ms({
      m: 1,
      pubkeys: pubKeys,
      network: this.bitcoinNetwork,
    });
    const address = bitcoin.payments.p2sh({
      redeem: pay2Multisig,
      network: this.bitcoinNetwork,
    }).address;
    return {
      encryptedWIF: null,
      address: address,
    } as BitcoinSimpleWallet;
  }

  /**
   * Gets private key from password and account
   * @param password
   * @param wallet
   * @return promise with selected wallet
   */
  public passwordToPrivateKey(
    password: string,
    wallet: BitcoinSimpleWallet
  ): PrivateKey {
    return PrivateKey.fromWIF(
      WalletProvider.decrypt(wallet.encryptedWIF, password)
    );
  }

  /**
   * Gets private key (hex format) from password and account
   * @param password
   * @param wallet
   * @return promise with selected wallet
   */
  public passwordToPrivateKeyHex(
    password: string,
    wallet: BitcoinSimpleWallet
  ): PrivateKey {
    return WalletProvider.decrypt(wallet.encryptedWIF, password);
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
      },
    });
  }

  /**
   * Generate Address QR Text
   * @param address address
   * @param amount
   * @param message
   * @return Address QR Text
   */
  public generateInvoiceQRText(
    address: Address,
    amount: number,
    message: string
  ): string {
    return JSON.stringify({
      data: {
        addr: address.toString(),
        amount: amount,
        msg: message,
      },
    });
  }

  /**
   * Get btc balance from an account
   * @param address address to check balance
   * @param network network of the address to check balance
   * @return Promise with mosaics information
   */
  public async getBTCBalance(
    rawAddress: string,
    network: string
  ): Promise<number> {
    const address = new Address(rawAddress);
    const isMainnet = network === 'livenet';
    if (!this.isValidAddress(address, network)) return null;
    if (isMainnet) {
      const data = await getBalance(address.toString());
      return data[address]['final_balance'] / Math.pow(10, 8);
    } else {
      // Option 0: Use blochain.info library (deactivated for testnet)
      // const data = await tBtcExplorer.getBalance(address.toString())
      // return data[address]['final_balance'] / Math.pow(10, 8);

      // // Option 1: Use Blockcypher API
      // const data: any = await this.http.get(`${this.BITCOIN_API}/test3/addrs/${address}`).toPromise();
      // return data.balance / Math.pow(10, 8);

      // Option 2: Use Mempool from Mempool.space
      const data: any = await this.btcApis.addresses.getAddress({ address });
      const balance =
        data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum;
      return balance / Math.pow(10, 8);
    }
  }

  /**
   * Check if account belongs it is valid
   * @param address address to check
   * @param network network of the address to check
   */
  public isValidAddress(address: Address, network?: string): boolean {
    if (!address) return false;
    return Address.isValid(
      address.toString(),
      network || this.getNetwork(address)
    );
  }

  /**
   * Check if public key is valid or not
   * @param publicKey publicKey to check
   * @return Bitcoin Public Key
   */
  public isValidPublicKey(publicKey: string): string {
    if (!publicKey) return null;
    return PublicKey.isValid(publicKey) ? publicKey : null;
  }

  /**
   * Get network of an Bitcoin address
   * @param address address to check network
   * @return Bitcoin network
   */

  public getNetwork(rawAddress: string): string {
    const network =
      rawAddress.startsWith('1') || rawAddress.startsWith('3')
        ? MAINET
        : TESTNET;
    return network === MAINET ? 'livenet' : 'testnet';
  }

  /**
   * Prepares xem transaction
   * @param recipientAddress recipientAddress
   * @param amount amount
   * @param wallet
   * @param password
   * @return Return transfer transaction
   */
  public async sendTransaction(
    recipientAddress: string,
    amount: number,
    fee: number,
    wallet: BitcoinSimpleWallet,
    password: string
  ) {
    if (!Address.isValid(recipientAddress)) return false;
    const isMainnet = this.getNetwork(recipientAddress) === 'livenet';
    const path = isMainnet ? 'main' : 'test3';
    const pathSochain = isMainnet ? 'BTC' : 'BTCTEST';

    const privateKey = this.passwordToPrivateKey(password, wallet);

    // const insight = new Insight('testnet');
    const utxos: any = await this.http
      .get(
        `${this.BITCOIN_API}/${path}/addrs/${wallet.address}?unspentOnly=true&includeScript=true`
      )
      .toPromise();
    const utxosSochain: any = await this.http
      .get(
        `https://sochain.com/api/v2/get_tx_unspent/${pathSochain}/${wallet.address}`
      )
      .toPromise();
    let totalAmountAvailable = 0;
    const inputs = [];
    let inputCount = 0;
    const outputCount = 2;
    let payFee = 0;
    if (utxos.txrefs) {
      payFee = fee;
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
    } else {
      utxosSochain.data.txs.forEach((element) => {
        const satoshisAmount = Math.floor(
          Number(element.value) * Math.pow(10, 8)
        );
        inputs.push({
          satoshis: satoshisAmount,
          script: element.script_hex,
          address: utxosSochain.data.address,
          txId: element.txid,
          outputIndex: element.output_no,
        });
        inputCount += 1;
        totalAmountAvailable += satoshisAmount;
        const transactionSize =
          inputCount * 146 + outputCount * 34 + 10 - inputCount;
        // We pay 20 satoshis per bytes of transaction
        payFee = transactionSize * 20;
      });
    }

    if (totalAmountAvailable - amount * Math.pow(10, 8) - fee < 0) {
      throw new Error('Balance is too low for this transaction');
    }
    const tx = new Transaction()
      .from(inputs)
      .to(recipientAddress, Math.floor(amount * Math.pow(10, 8)))
      .change(wallet.address)
      .fee(payFee)
      .sign(privateKey)
      .serialize();
    try {
      if (utxos.txrefs) {
        const result = await this.http
          .post(`${this.BITCOIN_API}/${path}/txs/push`, { tx: tx })
          .toPromise();
        return true;
      } else {
        const postData = {
          tx_hex: tx,
        };
        const result = await this.http
          .post(`https://sochain.com/api/v2/send_tx/${pathSochain}`, postData)
          .toPromise();
        return true;
      }
    } catch (err) {
      console.log('err', err);
      if (err.toString().indexOf('undefined') >= 0)
        throw new Error('Not enough fund!');
      return false;
    }
  }

  /**
   * Get all confirmed transactions of an account
   * @param address account Address
   * @param network network of the account
   * @return Promise with account transactions
   */
  public async getAllTransactionsFromAnAccount(
    rawAddress: string,
    network: string
  ): Promise<BitcoinTransaction[]> {
    const address = new Address(rawAddress);
    const isMainnet = network === 'livenet';
    const networkPath = isMainnet ? 'main' : 'test3';
    if (!this.isValidAddress(address, network)) return null;
    const lastBlockInfo = await this.http
      .get(`https://api.blockcypher.com/v1/btc/${networkPath}`)
      .toPromise();
    const lastBlockIndex = parseInt(lastBlockInfo['height']);

    const url = isMainnet
      ? 'https://blockchain.info/multiaddr?active=' +
        address.toString() +
        '&cors=true'
      : `${this.BITCOIN_API}/${networkPath}/addrs/${address.toString()}`;
    let response;
    if (isMainnet) {
      response = await this.http.get(url).toPromise();
    } else {
      response = await this.btcApis.addresses.getAddressTxsChain({ address });
    }
    console.log('transaction data', response);

    const transactions: BitcoinTransaction[] = [];
    if (isMainnet) {
      response['txs'].forEach((tx) => {
        let included = false;
        tx.out.forEach((out) => {
          const incoming = tx.result >= 0;
          if (
            (incoming && out.addr == address.toString()) ||
            (!incoming && out.addr != address.toString())
          ) {
            included = true;
            transactions.push({
              time: tx.time * 1000,
              incoming: incoming,
              sendingAddress: null,
              receivingAddress:
                incoming && tx.inputs[0]
                  ? tx.inputs[0].prev_out.addr
                  : out.addr,
              fee: tx.fee / Math.pow(10, 8),
              amount: out.value / Math.pow(10, 8),
              hash: tx.hash,
              confirmations:
                tx.block_height != undefined
                  ? lastBlockIndex - tx.block_height
                  : 0,
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
            confirmations:
              tx.block_height != undefined
                ? lastBlockIndex - tx.block_height
                : 0,
          });
        }
      });
    } else {
      // Reference: https://www.blockcypher.com/dev/bitcoin/#txref
      // Reference: https://mempool.space/testnet/api
      response.forEach((tx) => {
        let included = false;
        const sendingTxInfo = this.parseInnerTx(tx.vin, address.toString());
        const receivingTxInfo = this.parseInnerTx(tx.vout, address.toString());
        const incoming = sendingTxInfo.incomming && receivingTxInfo.incomming;
        const amount = incoming
          ? receivingTxInfo.amount
          : receivingTxInfo.amount;
        const time = tx.status.confirmed
          ? new Date(tx.status.block_time).getTime()
          : 0;
        if (tx.confirmations > 0) {
          included = true;
          transactions.push({
            time: time * 1000,
            incoming: incoming,
            sendingAddress: incoming
              ? tx.vin[0].prevout.scriptpubkey_address
              : sendingTxInfo.address,
            receivingAddress: incoming
              ? receivingTxInfo.address
              : tx.vout[0].scriptpubkey_address,
            fee: Math.abs(tx.fee / Math.pow(10, 8)),
            amount: Math.abs(amount / Math.pow(10, 8)),
            hash: tx.txid,
            confirmations: tx.status.confirmed
              ? lastBlockIndex - tx.status.block_height
              : 0,
          });
        }
        if (!included) {
          transactions.push({
            time: time * 1000,
            incoming: incoming,
            sendingAddress: incoming
              ? tx.vin[0].prevout.scriptpubkey_address
              : sendingTxInfo.address,
            receivingAddress: incoming
              ? receivingTxInfo.address
              : tx.vout[0].scriptpubkey_address,
            fee: Math.abs(tx.fee / Math.pow(10, 8)),
            amount: Math.abs(amount / Math.pow(10, 8)),
            hash: tx.txid,
            confirmations: tx.status.confirmed
              ? lastBlockIndex - tx.status.block_height
              : 0,
          });
        }
      });
    }
    return transactions;
  }

  public async getExportTransactionByPeriod(
    wallet: any,
    fromDate: Date,
    toDate: Date
  ): Promise<ExportTransactionModel[]> {
    const network = this.getNetwork(wallet.walletAddress);
    const allTxs = await this.getAllTransactionsFromAnAccount(
      wallet.walletAddress,
      network
    );
    const transactionByPeriod = allTxs.filter((value) => {
      const formatDate = moment(value.time).format('YYYY/MM/DD');
      const formatFrom = moment(fromDate).format('YYYY/MM/DD');
      const formatTo = moment(toDate).format('YYYY/MM/DD');
      return this.helperService.isInDateRange(new Date(formatDate), new Date(formatFrom), new Date(formatTo));
    });
    const transactionExports: ExportTransactionModel[] = [];
    for (const txs of transactionByPeriod) {
      const date = moment(txs.time).format('MM/DD/YYYY, HH:mm:ss A');
      const isIncomingTxs = txs.incoming;
      const txsAmount = txs.amount;
      const convertedAmount = txsAmount * wallet.exchangeRate;
      const convertedCurrency = wallet.currency;
      const payer = txs.sendingAddress;
      const message = '';

      const txsExportModel = new ExportTransactionModel(
        date,
        wallet.walletAddress,
        'BTC',
        `${isIncomingTxs ? '+' : '-'}${txsAmount}`,
        `${isIncomingTxs ? '+' : '-'}${convertedAmount}`,
        convertedCurrency,
        payer,
        message
      );
      transactionExports.push(txsExportModel);
    }
    return transactionExports;
  }

  private parseInnerTx(
    transactionsInfo: any[],
    walletAddress: string
  ): TransactionInfo {
    let incomming = true;
    let address: string;
    let amount: number;
    transactionsInfo.forEach((info) => {
      if (info.prevout) {
        if (info.prevout.scriptpubkey_address === walletAddress) {
          incomming = false;
          address = walletAddress;
          amount = info.prevout.value;
        }
      } else {
        if (info.scriptpubkey_address === walletAddress) {
          incomming = true;
          address = walletAddress;
          amount = info.value;
        }
      }
    });
    return {
      incomming: incomming,
      address: address, // TODO: recheck this data
      amount: amount,
    } as TransactionInfo;
  }

  public async calculateFee(): Promise<any> {
    // Option 0: Use API from www.bitcoinfees.earn.com
    // Reference: https://bitcoinfees.earn.com/api
    return new Promise<number>((resolve) => {
      fetch('https://bitcoinfees.earn.com/api/v1/fees/recommended')
        .then((res) => res.json())
        .then((out) => {
          resolve(this.getMedianTxFee(out));
        })
        .catch((err) => resolve(0));
    });

    // Option 1: Use Mempool from Mempool.space
    // const fee = await this.btcApis.fees.getFeesRecommended();
    // return this.getMedianTxFee(fee);
  }

  private getMedianTxFee(feeUnit: any): any {
    const TX_SIZE = 226;
    for (const fee in feeUnit) {
      feeUnit[fee] *= TX_SIZE;
    }
    return feeUnit;
  }

  public isValidPrivateKey(privateKey: string): boolean {
    return PrivateKey.isValid(privateKey, this.bitcoreNetwork);
  }
}
