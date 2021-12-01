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
    'http://ngl-dual-101.testnet.symboldev.network:3000',
    'http://ngl-dual-201.testnet.symboldev.network:3000',
    'http://ngl-dual-301.testnet.symboldev.network:3000',
    'http://ngl-dual-401.testnet.symboldev.network:3000',
    'http://ngl-dual-501.testnet.symboldev.network:3000',
    'http://ngl-dual-601.testnet.symboldev.network:3000',
  ],
  SYMBOL_NODE_DEFAULT: 'http://ngl-dual-601.testnet.symboldev.network:3000',
};
