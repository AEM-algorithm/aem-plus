const fs = require('fs');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// ---------- NEM NODES ----------

const NEM_NODES_TEST_NET = `[
    {protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugetestalice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'medalice2.nem.ninja', port: 7890},
  ]`;

const NEM_NODE_DEFAULT_TEST_NET = `{protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890}`;

const NEM_NODES_MAIN_NET = `[
    {protocol: 'http', domain: '62.75.171.41', port: 7890},
    {protocol: 'http', domain: 'san.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'go.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'alice6.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice3.nem.ninja', port: 7890}
  ]`;
const NEM_NODE_DEFAULT_MAIN_NET = `{protocol: 'http', domain: '62.75.171.41', port: 7890}`;

// ---------- SYMBOL NODES ----------

const SYMBOL_NODES_MAIN_NET = `[
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
  ]`;

const SYMBOL_NODE_DEFAULT_MAIN_NET = `'http://ngl-dual-601.testnet.symboldev.network:3000'`;

const SYMBOL_NODES_TEST_NET = `[
    'https://sym-test-02.opening-line.jp:3001',
    'http://301-joey-peer.symboltest.net:3000',
  ]`;

const SYMBOL_NODE_DEFAULT_TEST_NET = `'https://sym-test-02.opening-line.jp:3001'`;


const environmentExportFormat = (
    production,
    networkType,
    nemNodes,
    nemNodeDefault,
    symbolNodes,
    symbolNodeDefault,
    qrCodeVersion,
) => `export const environment = {
  production: ${production},
  NETWORK_TYPE: '${networkType}',
  NEM_NODES: ${nemNodes},
  NEM_NODE_DEFAULT: ${nemNodeDefault},
  SYMBOL_NODES: ${symbolNodes},
  SYMBOL_NODE_DEFAULT: ${symbolNodeDefault},
  QR_CODE_VERSION: ${qrCodeVersion},
};
`

// ---------- DECLARE ----------

const environment = './src/environments/environment.ts';
const MAIN_NET = 'MAIN_NET';
const TEST_NET = 'TEST_NET';

let production;
let NETWORK_TYPE;
let NEM_NODES;
let NEM_NODE_DEFAULT;
let SYMBOL_NODES;
let SYMBOL_NODE_DEFAULT;
let QR_CODE_VERSION = 1;

// ---------- RUN ----------

console.log('\x1b[36m%s\x1b[0m', `(1) ${MAIN_NET}`);
console.log('\x1b[36m%s\x1b[0m', `(2) ${TEST_NET} (default)`);

readline.question('Choose network: ', network => {
    network = typeof network === 'string' ? parseInt(network) : network;
    switch (network) {
        case 1:
            setMainNet();
            break;
        case 2:
            setTestNet();
            break;
        default:
            setTestNet();
            break;
    }
    setEnvironment();
    console.log('\x1b[33m%s\x1b[0m', `environment: ${NETWORK_TYPE}`); //yellow
    readline.close();
});

function setMainNet() {
    production = true;
    NETWORK_TYPE = MAIN_NET;
    NEM_NODES = NEM_NODES_MAIN_NET;
    NEM_NODE_DEFAULT = NEM_NODE_DEFAULT_MAIN_NET;
    SYMBOL_NODES = SYMBOL_NODES_MAIN_NET;
    SYMBOL_NODE_DEFAULT = SYMBOL_NODE_DEFAULT_MAIN_NET;
}

function setTestNet() {
    production = false;
    NETWORK_TYPE = TEST_NET;
    NEM_NODES = NEM_NODES_TEST_NET;
    NEM_NODE_DEFAULT = NEM_NODE_DEFAULT_TEST_NET;
    SYMBOL_NODES = SYMBOL_NODES_TEST_NET;
    SYMBOL_NODE_DEFAULT = SYMBOL_NODE_DEFAULT_TEST_NET;
}

function setEnvironment() {
    fs.readFile(environment, 'utf8', function(err, data) {
        if (err) {
            return console.error('readFile error', err);
        }

        const exportEnvironment = environmentExportFormat(
            production,
            NETWORK_TYPE,
            NEM_NODES,
            NEM_NODE_DEFAULT,
            SYMBOL_NODES,
            SYMBOL_NODE_DEFAULT,
            QR_CODE_VERSION,
        )

        fs.writeFile(environment, exportEnvironment, 'utf8', function(err) {
            if (err) {
                return console.error('writeFile error', err);
            }
        });
    });
}
