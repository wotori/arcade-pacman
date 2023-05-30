import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const CHAIN_ID = "constantine-3";
const RPC = "https://rpc.constantine.archway.tech";

export async function connectKeplr() {
  console.log("suggest chain...");
  await window.keplr.experimentalSuggestChain({
    chainId: CHAIN_ID,
    chainName: "archway-test-const3",
    rpc: RPC,
    rest: "https://api.constantine.archway.tech",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "const",
      bech32PrefixAccPub: "const" + "pub",
      bech32PrefixValAddr: "const" + "valoper",
      bech32PrefixValPub: "const" + "valoperpub",
      bech32PrefixConsAddr: "const" + "valcons",
      bech32PrefixConsPub: "const" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "CONST",
        coinMinimalDenom: "aconst",
        coinDecimals: 6,
        coinGeckoId: undefined,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "const",
        coinMinimalDenom: "aconst",
        coinDecimals: 18,
        coinGeckoId: "cosmos",
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.04,
        },
      },
    ],
    stakeCurrency: {
      coinDenom: "CONST",
      coinMinimalDenom: "aconst",
      coinDecimals: 6,
      coinGeckoId: undefined,
    },
  });
}

export async function loadData() {
  // get wallet address
  const offlineSigner = window.getOfflineSigner(CHAIN_ID);
  let walletAddress = await offlineSigner.getAccounts();
  console.log("user wallet loaded: ", walletAddress[0].address);

  signingClient = await SigningCosmWasmClient.connectWithSigner(
    RPC,
    offlineSigner,
    { gasPrice: "auto" }
  );

  // query smc state
  let incrementAddress =
    "archway17ef78dfdajz7hzzky6dev8dccmsczwktuzfwcrnfgs4rlk6qxkqs7ampla";

  let response = await signingClient.queryContractSmart(incrementAddress, {
    get_count: {},
  });
  
  console.log("get contract response: ", response);
}
