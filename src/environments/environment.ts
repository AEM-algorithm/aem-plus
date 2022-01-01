export const environment = {
  production: false,
  NETWORK_TYPE: 'TEST_NET',
  NEM_NODES: [
    {protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugetestalice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'medalice2.nem.ninja', port: 7890},
  ],
  NEM_NODE_DEFAULT: {protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890},
  SYMBOL_NODES: [
    'https://sym-test-02.opening-line.jp:3001',
    'http://301-joey-peer.symboltest.net:3000',
  ],
  SYMBOL_NODE_DEFAULT: 'https://sym-test-02.opening-line.jp:3001',
  QR_CODE_VERSION: 1,
  COINMARKETCAP_APIKEYS: ['yourApiKey'],
};
