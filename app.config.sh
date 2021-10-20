environment="src/environments/environment.ts"
network_type=""
MAIN_NET="MAIN_NET"
TEST_NET="TEST_NET"

echo "(1) $MAIN_NET"
echo "(2) $TEST_NET"
echo "Choose network type:"

# ---------- NEM NODES ----------
NEM_NODES_TEST_NET="[
    {protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugetestalice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'medalice2.nem.ninja', port: 7890},
  ]"

NEM_NODE_DEFAULT_TEST_NET="{protocol: 'http', domain: 'hugetestalice.nem.ninja', port: 7890}"

NEM_NODES_MAIN_NET="[
    {protocol: 'http', domain: '62.75.171.41', port: 7890},
    {protocol: 'http', domain: 'san.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'go.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'alice6.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice2.nem.ninja', port: 7890},
    {protocol: 'http', domain: 'hugealice3.nem.ninja', port: 7890}
  ]"
NEM_NODE_DEFAULT_MAIN_NET="{protocol: 'http', domain: '62.75.171.41', port: 7890}"

# ---------- SYMBOL NODES ----------

SYMBOL_NODES_MAIN_NET="[
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
  ]"

SYMBOL_NODE_DEFAULT_MAIN_NET="'http://ngl-dual-001.symbolblockchain.io:3000'"

SYMBOL_NODES_TEST_NET="[
    'http://ngl-dual-001.testnet.symboldev.network:3000',
    'http://ngl-dual-101.testnet.symboldev.network:3000',
    'http://ngl-dual-201.testnet.symboldev.network:3000',
    'http://ngl-dual-301.testnet.symboldev.network:3000',
    'http://ngl-dual-401.testnet.symboldev.network:3000',
    'http://ngl-dual-501.testnet.symboldev.network:3000',
    'http://ngl-dual-601.testnet.symboldev.network:3000',
  ]"
SYMBOL_NODE_DEFAULT_TEST_NET="'http://ngl-dual-001.testnet.symboldev.network:3000'"

env_config() {
  production=$1
  network_type=$2

  nem_nodes=$NEM_NODES_TEST_NET
  nem_node_default=$NEM_NODE_DEFAULT_TEST_NET

  if [ $2 == "$MAIN_NET" ]; then
      nem_nodes=$NEM_NODES_MAIN_NET
      nem_node_default=$NEM_NODE_DEFAULT_MAIN_NET
  fi

  symbol_nodes=$SYMBOL_NODES_TEST_NET
  symbol_node_default=$SYMBOL_NODE_DEFAULT_TEST_NET

  if [ $2 == "$MAIN_NET" ]; then
      symbol_nodes=$SYMBOL_NODES_MAIN_NET
      symbol_node_default=$SYMBOL_NODE_DEFAULT_MAIN_NET
  fi

cat << EOF > $environment
export const environment = {
  production: $production,
  NETWORK_TYPE: '$network_type',
  NEM_NODES: $nem_nodes,
  NEM_NODE_DEFAULT: $nem_node_default,
  SYMBOL_NODES: $symbol_nodes,
  SYMBOL_NODE_DEFAULT: $symbol_node_default,
};
EOF
}


while :
do
  read network
  case $network in
	1)
	  env_config 'true' "$MAIN_NET"
    break
		;;
	2)
	  env_config 'false' "$TEST_NET"
		break
		;;
	*)
		echo "Choose again: "
		;;
  esac
done

echo "Environment: $network_type"



