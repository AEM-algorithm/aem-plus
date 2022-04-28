import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '@environments/environment';

export interface IErcTokenBalance {
    balance: string,
    decimals: string,
    logo: string,
    name: string,
    symbol: string,
    thumbnail: string,
    token_address: string,
    tokenType: ErcTokenTypes,
}

export enum ErcTokenTypes {
    ERC20 = 'erc20',
    NFT = 'nft'
}

@Injectable({ providedIn: 'root' })
export class EthersTokensProvider {
    public readonly DEFAULT_ACCOUNT_PATH = `m/44'/60'/0'/0/0`;
    public isMainNet = environment.NETWORK_TYPE === 'MAIN_NET';

    MORALIS_API_URL = "https://deep-index.moralis.io"
    MORALIS_API_KEYS = environment.MORALIS_API_KEYS;
    constructor(
        private http: HTTP,
        private platform: Platform,
        private httpClient: HttpClient,
    ) {
    }

    public async getErcTokenBalance(address: string, network: string, tokenType: ErcTokenTypes): Promise<IErcTokenBalance[]> {

        let isDone: boolean = false;
        let url = `${this.MORALIS_API_URL}/api/v2/${address}/${tokenType}`;
        let i = 0;
        do {
            const headers = {
                'accept': 'application/json',
                'X-API-Key': this.MORALIS_API_KEYS[i],
            };

            let response: any;
            if (this.platform.is('cordova')) {
                try {
                    const _response = await this.http.get(
                        url,
                        {
                            chain: network,
                        },
                        headers
                    );
                    response = JSON.parse(_response.data);
                } catch (e) {
                    console.log(
                        'etherTokens.provider',
                        'getErc20TokenBalance()',
                        'platform: cordova',
                        e
                    );
                    response = JSON.parse(e.error);
                }
            } else {
                url += `?chain=${network}`;
                try {
                    const result: any = await this.httpClient.get(url, { headers }).toPromise();
                    const ercTokensBalances = (tokenType === ErcTokenTypes.ERC20) ? result as IErcTokenBalance[]
                                                : result.result;

                    if (ercTokensBalances && ercTokensBalances.length > 0) {
                        switch (tokenType) {
                            case ErcTokenTypes.NFT:
                                const nftBalances: IErcTokenBalance[] = [];
                                ercTokensBalances.forEach(ercTokensBalance => {
                                    nftBalances.push({
                                        balance: ercTokensBalance.amount,
                                        decimals: '0',
                                        logo: '',
                                        name: ercTokensBalance.name,
                                        symbol: '',
                                        thumbnail: '',
                                        token_address: ercTokensBalance.token_address,
                                        tokenType: tokenType,
                                    });
                                });
                                response = nftBalances;
                                break;
                            case ErcTokenTypes.ERC20:
                            default:
                                const erc20Balances: IErcTokenBalance[] = [];
                                ercTokensBalances.forEach(ercTokensBalance => {
                                    erc20Balances.push({...ercTokensBalance, tokenType: tokenType});
                                });
                                response = erc20Balances;
                                break;
                        }
                    }
                    isDone = true;
                } catch (e) {
                    console.log('etherTokens.provider', 'getErc20TokenBalance()', e);
                    console.warn(
                        'Please use extension below to allow cors-access-control in your browser\n' +
                        'Chrome ex:' +
                        'https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf'
                    );
                    response = "Unable to get ERC tokens";
                }
            }
            if (isDone) return response;
            i++;
        } while (i < this.MORALIS_API_KEYS.length)
        return null;
    }
}
