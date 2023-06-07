import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { GasPrice } from "@cosmjs/stargate";

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
        coinDecimals: 18,
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

export let offlineSigner;
export let walletAddress;
export let signingClient;

export async function initKeplr() {
  connectKeplr()
  // get wallet address
  offlineSigner = window.getOfflineSigner(CHAIN_ID);
  walletAddress = await offlineSigner.getAccounts();
  console.log("user wallet loaded: ", walletAddress[0].address);

  signingClient = await SigningCosmWasmClient.connectWithSigner(
    RPC,
    offlineSigner,
    { gasPrice: GasPrice.fromString("0.02aconst") }
  );
}
