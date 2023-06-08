import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice } from "@cosmjs/stargate";

export let backendWallet;
export let backendClient;
export const RPC = "https://rpc.constantine.archway.tech";
console.log("init backend wallet...");
const pacmanContract = "archway10mxcxvyjnpcmnkg0sxf7r25f3wzjqdz6jp4jux";
const walletAddress =
  "archway13fp2wnhh4wjjq44qcejp2mw6rgkxw6vfld6g4e5taqj6g4s4ju4swdm7na";
const smartContract =
  "archway13fp2wnhh4wjjq44qcejp2mw6rgkxw6vfld6g4e5taqj6g4s4ju4swdm7na";
const network = {
  endpoint: RPC,
  prefix: "archway",
};
let encodedString =
  "Ymx1ciBkb3ZlIHplcm8gbnV0IG9wZW4gYmFjaGVsb3IgdHJ1c3QgcmVwZWF0IGNsaWVudCBkcmlsbCBvcGVyYSB3b3JkIHR5cGUgYnV6eiBidXNpbmVzcyBsZWdlbmQgYWRkcmVzcyBsaWJlcnR5IHByaWRlIGluc3RhbGwgdHJhcCBoYXdrIGNhY3R1cyBzaGFsbG93";
let walletMnemonic = atob(encodedString);
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

const user = { name: "Sally", address: "archway####", score: 33772 };

// TODO: this should work at the backend side
console.log("execute transaction with user:", user);
const { transactionHash } = await backendClient.execute(
  pacmanContract,
  smartContract,
  {
    AddTopUser: {
      user: {
        address: user.address,
        name: user.name,
        score: user.score,
      },
    },
  },
  "auto"
);
console.log("hash:", transactionHash);
