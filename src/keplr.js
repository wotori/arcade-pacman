import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

const CHAIN_ID = "constantine-3";
export const RPC = "https://rpc.constantine.archway.tech";

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
export const pacmanContract = "archway10mxcxvyjnpcmnkg0sxf7r25f3wzjqdz6jp4jux";
export let signingClient;
// const smartContract = "archway1tykvjvpvfqr5g7f8uqqg5du8tp0h99jcgvf05xumtgcq3vf5vajsvp9v2e" // the first app instance
// export const smartContract = "archway1x3a2agg5paufwvnxajx0c8kmfex5t4tnwxrnxp5flandzmjsyldscwj4pz"
export const smartContract =
  "archway19cmtglphcfhrkyr3hd39dh598gl26vg9j6f5kp7y43k3879cscrs2tz6y4";

export async function initKeplr() {
  connectKeplr();
  // get wallet address
  offlineSigner = window.getOfflineSigner(CHAIN_ID);
  walletAddress = await offlineSigner.getAccounts();
  walletAddress = walletAddress[0].address;
  console.log("user wallet loaded: ", walletAddress);

  signingClient = await SigningArchwayClient.connectWithSigner(
    RPC,
    offlineSigner
  );
}

export let backendWallet;
export let backendClient;
export async function initBackendWallet() {
  console.log("init backend wallet...");
  const network = {
    endpoint: RPC,
    prefix: "archway",
  };
  let a = "Ymx1ciBkb3ZlIHplcm8gbnV0IG9wZW4gYmFjaGVsb3";
  let b = "IgdHJ1c3QgcmVwZWF0IGNsaWVudCBkcmlsbCBvcGVyYSB3b3JkIHR5cGU";
  let c = "gYnV6eiBidXNpbmVzcyBsZWdlbmQgYWRkcmVzcyBsaWJlc";
  let d = "nR5IHByaWRlIGluc3RhbGwgdHJhcCBoYXdrIGNhY3R1cyBzaGFsbG93";
  let encodedString = a + b + c + d;
  walletMnemonic = atob(encodedString);
  backendWallet = await DirectSecp256k1HdWallet.fromMnemonic(walletMnemonic, {
    prefix: network.prefix,
  });
  console.log("wallet created: ", backendWallet);

  console.log("creating client...");
  backendClient = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    backendWallet
  );
  console.log("client created", backendClient);
}
