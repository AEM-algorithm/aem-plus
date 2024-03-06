import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import {
  Address as SymbolAddress,
  Mosaic as SymbolMosaic,
  MosaicInfo as SymbolMosaicInfo,
  MosaicNames as SymbolMosaicNames,
} from 'symbol-sdk';
import { Address as NemAddress, MosaicTransferable } from 'nem-library';
import { BigNumber } from 'ethers';

import { Wallet } from 'src/app/services/models/wallet.model';
import { Token } from 'src/app/services/models/token.model';
import { SymbolProvider } from 'src/app/services/symbol/symbol.provider';
import { NemProvider } from 'src/app/services/nem/nem.provider';
import { EthersProvider } from '@app/services/ethers/ethers.provider';
import { IErcTokenBalance } from '@app/services/ethers/ethersTokens.provider';
import { ExchangeProvider } from '@app/services/exchange/exchange.provider';

import { WALLET_ICON } from 'src/app/constants/constants';
import { Coin } from 'src/app/enums/enums';
import { BnbProvider } from '@app/services/bnb/bnb.provider';

// TODO add more type
type SymbolBalanceType = {
  mosaic: SymbolMosaic;
  info: SymbolMosaicInfo;
  namespaceNames: SymbolMosaicNames;
};

type ModeType = 'send' | 'receive' | 'wallet';
type BalanceType = SymbolBalanceType | MosaicTransferable | IErcTokenBalance;
type ETHFilterType = 'All' | 'ERC-20' | 'NFT';

@Component({
  selector: 'app-select-wallet-modal',
  templateUrl: './select-wallet-modal.component.html',
  styleUrls: ['./select-wallet-modal.component.scss'],
})
export class SelectWalletModalComponent implements OnInit {
  @Input() mode: ModeType;
  @Input() selectedWallet: Wallet;
  tokens: any[];
  fiatSymbol: string;

  walletIcon = WALLET_ICON;
  balances: BalanceType[];
  isLoading: boolean = false;

  ethFilterType: ETHFilterType;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private symbol: SymbolProvider,
    private nem: NemProvider,
    private ethers: EthersProvider,
    private bnb: BnbProvider,
    private exchange: ExchangeProvider
  ) { }

  async ngOnInit() {
    if (this.selectedWallet.walletType === 'ETH') {
      this.ethFilterType = 'All';
    }
    const currency = await this.exchange.getFiatCurrency();
    this.fiatSymbol = currency.fiatSymbol;
  }

  async ionViewWillEnter() {
    this.setLoading(true);
    await this.initializeTokens();
    this.setLoading(false);
  }

  setTokens(tokens: Token[]) {
    this.selectedWallet.tokens = tokens;
    this.tokens = tokens;
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }

  async initializeTokens() {
    this.balances = await this.getBalance();
    const tokens = this.getToken(this.balances);
    this.setTokens(tokens);
  }

  async getBalance(): Promise<BalanceType[]> {
    let balance: BalanceType[] = [];
    switch (this.selectedWallet.walletType) {
      case Coin.SYMBOL:
        const symbolAddress: SymbolAddress = this.symbol.getAddress(
          this.selectedWallet.walletAddress
        );
        balance = await this.symbol.getSymbolTokens(symbolAddress);
        break;
      case Coin.NEM:
        const nemAddress: NemAddress = new NemAddress(
          this.selectedWallet.walletAddress
        );
        balance = await this.nem.getBalance(nemAddress);
        break;
      case Coin.BITCOIN:
        // Bitcoin has no sub-tokens
        break;
      case Coin.ETH:
        const erc20TokensBalances = await this.ethers.getErc20Balance(
          this.selectedWallet.walletAddress
        );
        const nftTokensBalances = await this.ethers.getNftBalance(
          this.selectedWallet.walletAddress
        );
        balance = [
          ...(erc20TokensBalances || []),
          ...(nftTokensBalances || []),
        ];
        break;
      case Coin.BNB:
        break;
      case Coin.ASTAR:
        break;
      default:
        break;
    }
    return balance;
  }

  getToken(balances: BalanceType[]): Token[] {
    if (balances && balances.length > 0) {
      switch (this.selectedWallet.walletType) {
        case Coin.SYMBOL:
          const symbolTokens = balances.map(
            ({ mosaic, info, namespaceNames }: SymbolBalanceType) =>
              new Token(
                mosaic.id.id.toHex(),
                this.namespaceFormat(namespaceNames)
                  ? this.namespaceFormat(namespaceNames)
                  : mosaic.id.id.toHex(),
                [
                  -1,
                  this.balanceFormat(
                    mosaic.amount.compact(),
                    info.divisibility
                  ),
                ]
              )
          );
          return symbolTokens.filter(
            (value) => value.id !== this.symbol.symbolMosaicId
          );
        case Coin.NEM:
          const defaultNemMosaicId = 'nem:xem';
          const nemTokens = balances.map(
            (value: MosaicTransferable) =>
              new Token(
                value.mosaicId.description(),
                value.mosaicId.description(),
                [-1, value.amount]
              )
          );
          return nemTokens.filter((value) => value.id !== defaultNemMosaicId);
        case Coin.BITCOIN:
          // Bitcoin has no sub-tokens
          return [];
        case Coin.ETH:
          return balances.map(
            (token: IErcTokenBalance) =>
              new Token(
                token.token_address,
                token.name,
                [-1, this.balanceFormat(token.balance, token.decimals)],
                token.tokenType
              )
          );
        case Coin.BNB:
          return [];
        case Coin.ASTAR:
          return [];
      }
    }
    return [];
  }

  namespaceFormat(namespace: SymbolMosaicNames): string {
    if (namespace.names.length > 0) {
      return namespace.names.map((_) => _.name).join(':');
    }
    return null;
  }

  balanceFormat(
    inputAmount: number | string,
    inputDivisibility: number | string
  ): number {
    const amount = BigNumber.from(inputAmount);
    const divisibility = BigNumber.from(10).pow(inputDivisibility);
    const intPart = amount.div(divisibility).toString();
    const decimalPart = amount.mod(divisibility).toString();
    const result = parseFloat(intPart + '.' + decimalPart);
    return result;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  private navToWallet() {
    let walletPage;
    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        break;
      case Coin.BITCOIN:
        walletPage = 'bitcoin';
        break;
      case Coin.ETH:
        walletPage = 'eth';
        break;
      case Coin.BNB:
        walletPage = 'bnb';
        break
      case Coin.ASTAR:
        walletPage = 'astar';
        break;
    }
    console.log('walletPage ', walletPage)
    if (walletPage) {
      this.router.navigate([
        '/tabnav',
        'wallets',
        walletPage,
        this.selectedWallet.walletId,
      ]);
    }

    this.modalCtrl.dismiss();
  }

  private navToToken(index) {
    let walletPage;
    let token;

    const selectedToken = this.selectedWallet.tokens[index];

    switch (this.selectedWallet.walletType) {
      case Coin.NEM:
        walletPage = 'nem';
        token = this.getWalletToken(selectedToken) as MosaicTransferable;
        break;
      case Coin.SYMBOL:
        walletPage = 'symbol';
        token = this.getWalletToken(selectedToken) as SymbolBalanceType;
        break;
      case Coin.BITCOIN:
        walletPage = 'bitcoin';
        break;
      case Coin.ETH:
        walletPage = 'eth';
        token = this.getWalletToken(selectedToken) as IErcTokenBalance;
        break;
      case Coin.BNB:
        walletPage = 'bnb';
        break;
      case Coin.ASTAR:
        walletPage = 'astr';
        break;
    }

    if (walletPage && token) {
      this.router.navigate(
        [
          '/tabnav',
          'wallets',
          walletPage,
          this.selectedWallet.walletId,
          'token',
          selectedToken.id,
        ],
        {
          state: {
            token,
          },
        }
      );
    }

    this.modalCtrl.dismiss();
  }

  onSelectWallet() {
    const selectMosaic = this.balances[0];
    switch (this.mode) {
      case 'send':
        this.router.navigate(
          ['/tabnav', 'wallets', 'send', this.selectedWallet.walletId],
          {
            state: { selectMosaic },
          }
        );
        break;
      case 'receive':
        this.router.navigate(
          ['/tabnav', 'wallets', 'receive', this.selectedWallet.walletId],
          {
            state: { selectMosaic },
          }
        );
        break;
      case 'wallet':
        this.navToWallet();
        break;
      default:
        break;
    }

    this.close();
  }

  onSelectToken(index) {
    const selectedToken = this.selectedWallet.tokens[index];
    let mosaic;
    switch (this.mode) {
      case 'send':
        switch (this.selectedWallet.walletType) {
          case Coin.NEM:
            mosaic = this.balances.find(
              (value: MosaicTransferable) =>
                value.mosaicId.description() === selectedToken.id
            );
            break;
          case Coin.SYMBOL:
            mosaic = this.balances.find(
              (value: SymbolBalanceType) =>
                value.mosaic.id.id.toHex() === selectedToken.id
            );
            break;
          case Coin.BITCOIN:
            break;
          case Coin.ETH:
            mosaic = this.balances.find(
              (value: IErcTokenBalance) =>
                value.token_address === selectedToken.id
            );
            break;
        }
        if (mosaic) {
          this.router.navigate(
            [
              '/tabnav',
              'wallets',
              'send',
              this.selectedWallet.walletId,
              'token',
              selectedToken.id,
            ],
            {
              state: { selectMosaic: mosaic },
            }
          );
        }
        break;
      case 'receive':
        switch (this.selectedWallet.walletType) {
          case Coin.NEM:
            mosaic = this.balances.find(
              (value: MosaicTransferable) =>
                value.mosaicId.description() === selectedToken.id
            );
            break;
          case Coin.SYMBOL:
            mosaic = this.balances.find(
              (value: SymbolBalanceType) =>
                value.mosaic.id.id.toHex() === selectedToken.id
            );
            break;
          case Coin.BITCOIN:
            break;
          case Coin.ETH:
            mosaic = this.balances.find(
              (value: IErcTokenBalance) =>
                value.token_address === selectedToken.id
            );
            break;
        }
        if (mosaic) {
          this.router.navigate(
            [
              '/tabnav',
              'wallets',
              'receive',
              this.selectedWallet.walletId,
              'token',
              selectedToken.name,
            ],
            {
              state: { selectMosaic: mosaic },
            }
          );
        }
        break;
      case 'wallet':
        this.navToToken(index);
        break;
      default:
        break;
    }

    this.close();
  }

  getWalletToken(token): BalanceType {
    if (this.balances && this.balances.length > 0) {
      switch (this.selectedWallet.walletType) {
        case Coin.SYMBOL:
          return this.balances.find(
            (balance: SymbolBalanceType) =>
              token.id === balance.mosaic.id.id.toHex()
          );
        case Coin.NEM:
          return this.balances.find(
            (balance: MosaicTransferable) =>
              token.id === balance.mosaicId.description()
          );
        case Coin.BITCOIN:
          // Bitcoin has no sub-token
          return;
        case Coin.ETH:
          return this.balances.find(
            (balance: IErcTokenBalance) => token.id === balance.token_address
          );
      }
    }
    return;
  }

  handleETHFilterTypeSelected(type: ETHFilterType) {
    this.ethFilterType = type;
    switch (type) {
      case 'All':
        this.tokens = this.selectedWallet.tokens;
        break;
      case 'ERC-20':
        this.tokens = this.selectedWallet.tokens.filter(
          (value) => value.tokenType === 'erc20'
        );
        break;
      case 'NFT':
        this.tokens = this.selectedWallet.tokens.filter(
          (value) => value.tokenType === 'nft'
        );
        break;
    }
  }
}
