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
  ETH_NODES: [
    'ropsten',
    'rinkeby',
    'goerli',
    'kovan',
  ],
  ETH_NODE_DEFAULT: 'ropsten',
  QR_CODE_VERSION: 1,
  COINMARKETCAP_APIKEYS: ['e79ec505-0913-439d-ae07-069e296a6079', '231f04b7-44ce-4dcd-8dfd-0f0e0e1fbda4', 'a2de77d6-dd9c-49dc-9ba9-678b69d7c889', '791281c5-37e6-42b6-b2a3-56d62218e5bb'],
  MORALIS_API_KEY: 'qxQvEc1sZM69MGQtxrBB0bTaeViSAovL3r3G3cUTYwIG7DrZ4WHs7MEeLZgx162o',
};
