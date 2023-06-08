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
// const smartContract = "archway1tykvjvpvfqr5g7f8uqqg5du8tp0h99jcgvf05xumtgcq3vf5vajsvp9v2e" // the first app instance
// export const smartContract = "archway1x3a2agg5paufwvnxajx0c8kmfex5t4tnwxrnxp5flandzmjsyldscwj4pz"
export const smartContract = "archway13fp2wnhh4wjjq44qcejp2mw6rgkxw6vfld6g4e5taqj6g4s4ju4swdm7na"

export async function initKeplr() {
  connectKeplr();
  // get wallet address
  offlineSigner = window.getOfflineSigner(CHAIN_ID);
  walletAddress = await offlineSigner.getAccounts();
  walletAddress = walletAddress[0].address;
  console.log("user wallet loaded: ", walletAddress);

  signingClient = await SigningCosmWasmClient.connectWithSigner(
    RPC,
    offlineSigner,
    { gasPrice: GasPrice.fromString("0.02aconst") }
  );
}
