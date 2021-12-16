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
    'http://35.73.39.155:3000',
    'http://301-joey-peer.symboltest.net:3000',
  ],
  SYMBOL_NODE_DEFAULT: 'http://35.73.39.155:3000',
};
