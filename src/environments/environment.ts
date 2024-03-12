export const environment = {
  production: false,
  NETWORK_TYPE: 'TEST_NET',
  NEM_NODES: [
    { protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890 },
    { protocol: 'http', domain: 'hugetestalice2.nem.ninja', port: 7890 },
    { protocol: 'http', domain: 'medalice2.nem.ninja', port: 7890 },
  ],
  NEM_NODE_DEFAULT: { protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890 },
  SYMBOL_NODES: [
    'https://sym-test-02.opening-line.jp:3001',
    'https://001-sai-dual.symboltest.net:7900',

  ],
  SYMBOL_NODE_DEFAULT: 'https://sym-test-02.opening-line.jp:3001',
  ETH_NODES: [
    'ropsten',
    'rinkeby',
    'goerli',
    'kovan',
    'sepolia',
  ],
  ETH_NODE_DEFAULT: 'sepolia',
  QR_CODE_VERSION: 1,
  COINMARKETCAP_APIKEYS: undefined,
  MORALIS_API_KEYS: ['qxQvEc1sZM69MGQtxrBB0bTaeViSAovL3r3G3cUTYwIG7DrZ4WHs7MEeLZgx162o', 'cZR1DmbrYLHja983Tg74bsDZ49wcETBU3FpjauFLYEpFtuQNCXpToQSf3rvFudRn'],
  CDN_SERVER: 'undefined',
  DONATION_NEM_ADDRESS: 'TCYTU4AFJHR47SIFA2JW27IIF4DXEUKHRRZ5YOET',
  DONATION_XYM_ADDRESS: 'TBRQ37PV2XWOM3MBV2EKH24KBYGE5OJFW4JCJ6Q',
  DONATION_BTC_ADDRESS: 'tb1q0zg5pdyrgq26vjuth0mjsmf05xsf334fqcslr2',
  DONATION_ETH_ADDRESS: '0xb925989d5AB80965208c7Ead30c661ff256DE269',
};
