import { ServerConfig } from 'nem-library';

/**
 * ---- TEST_NET ----
 */
export const NEM_NODES_TEST_NET: ServerConfig[] = [
  {protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'hugetestalice2.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'medalice2.nem.ninja', port: 7890},
];
export const NEM_DEFAULT_NODE_TEST_NET: ServerConfig = NEM_NODES_TEST_NET[0];

/**
 * ---- MAIN_NET ----
 */
export const NEM_NODES_MAIN_NET: ServerConfig[] = [
  {protocol: 'http', domain: '62.75.171.41', port: 7890},
  {protocol: 'http', domain: 'san.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'go.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'alice6.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'hugealice2.nem.ninja', port: 7890},
  {protocol: 'http', domain: 'hugealice3.nem.ninja', port: 7890}
];
export const NEM_DEFAULT_NODE_MAIN_NET: ServerConfig = NEM_NODES_MAIN_NET[0];
