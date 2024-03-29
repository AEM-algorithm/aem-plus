export const environment = {
  production: true,
  NETWORK_TYPE: 'MAIN_NET',
  NEM_NODES: [
    {protocol: 'http', domain: '62.75.171.41', port: 7890},
    {protocol: 'http', domain: 'san.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'go.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'alice6.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice3.nem.ninja', port: 7890}
  ],
  NEM_NODE_DEFAULT: {protocol: 'http', domain: '62.75.171.41', port: 7890},
  SYMBOL_NODES: [
    'http://ngl-dual-001.symbolblockchain.io:3000',
    'http://ngl-dual-002.symbolblockchain.io:3000',
    'http://ngl-dual-003.symbolblockchain.io:3000',
    'http://ngl-dual-004.symbolblockchain.io:3000',
    'http://ngl-dual-005.symbolblockchain.io:3000',
    'http://ngl-dual-101.symbolblockchain.io:3000',
    'http://ngl-dual-102.symbolblockchain.io:3000',
    'http://ngl-dual-103.symbolblockchain.io:3000',
    'http://ngl-dual-104.symbolblockchain.io:3000',
    'http://ngl-dual-105.symbolblockchain.io:3000',
    'http://ngl-dual-201.symbolblockchain.io:3000',
    'http://ngl-dual-202.symbolblockchain.io:3000',
    'http://ngl-dual-203.symbolblockchain.io:3000',
    'http://ngl-dual-204.symbolblockchain.io:3000',
    'http://ngl-dual-205.symbolblockchain.io:3000',
    'http://ngl-dual-301.symbolblockchain.io:3000',
    'http://ngl-dual-302.symbolblockchain.io:3000',
    'http://ngl-dual-303.symbolblockchain.io:3000',
    'http://ngl-dual-304.symbolblockchain.io:3000',
    'http://ngl-dual-305.symbolblockchain.io:3000',
    'http://ngl-dual-401.symbolblockchain.io:3000',
    'http://ngl-dual-402.symbolblockchain.io:3000',
    'http://ngl-dual-403.symbolblockchain.io:3000',
    'http://ngl-dual-404.symbolblockchain.io:3000',
    'http://ngl-dual-405.symbolblockchain.io:3000',
    'http://ngl-dual-501.symbolblockchain.io:3000',
    'http://ngl-dual-502.symbolblockchain.io:3000',
    'http://ngl-dual-503.symbolblockchain.io:3000',
    'http://ngl-dual-504.symbolblockchain.io:3000',
    'http://ngl-dual-505.symbolblockchain.io:3000',
    'http://ngl-dual-601.symbolblockchain.io:3000',
    'http://ngl-dual-602.symbolblockchain.io:3000',
    'http://ngl-dual-603.symbolblockchain.io:3000',
    'http://ngl-dual-604.symbolblockchain.io:3000',
    'http://ngl-dual-605.symbolblockchain.io:3000',
    'http://001symbol.blockchain-node.tech:3000',
    'https://01.symbol-blockchain.com:3001',
    'https://02.symbol-blockchain.com:3001',
  ],
  SYMBOL_NODE_DEFAULT: 'http://001symbol.blockchain-node.tech:3000',
  ETH_NODES: [
    'homestead',
  ],
  ETH_NODE_DEFAULT: 'homestead',
  QR_CODE_VERSION: 1,
  COINMARKETCAP_APIKEYS: ['<yourFirstApiKey>','<yourSecondApiKey>'],
  MORALIS_API_KEYS: ['<yourFirstApiKey>','<yourSecondApiKey>'],
  CDN_SERVER: '<yourCdnServer>',
  DONATION_NEM_ADDRESS: 'NAVSPTYCPRDAX7IX3SXMGFZ53R6I2RDS7TXV3LNI',
  DONATION_XYM_ADDRESS: 'NDXMIVFFEEQCN2SYTMLXGNZJSRO4RNK4G3CKLKQ',
  DONATION_BTC_ADDRESS: '1CueWeuUJon3wprbpSMH1Et2Vii9A1nBKv',
  DONATION_ETH_ADDRESS: '0xdC02250eB83BE164d6eDC5416529A90Ef955ee14',
};
