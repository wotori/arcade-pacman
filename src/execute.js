import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { smartContract, walletAddress } from "./keplr";
import { loadScoreboard } from "./init";

export async function saveUserContactBackend(user) {
  // TODO: this should work at the backend side
  console.log("execute transaction");
  const network = {
    endpoint: "https://rpc.constantine.archway.tech",
    prefix: "archway",
  };
  let encodedString =
    "Ymx1ciBkb3ZlIHplcm8gbnV0IG9wZW4gYmFjaGVsb3IgdHJ1c3QgcmVwZWF0IGNsaWVudCBkcmlsbCBvcGVyYSB3b3JkIHR5cGUgYnV6eiBidXNpbmVzcyBsZWdlbmQgYWRkcmVzcyBsaWJlcnR5IHByaWRlIGluc3RhbGwgdHJhcCBoYXdrIGNhY3R1cyBzaGFsbG93";
  const walletMnemonic = atob(encodedString);

  console.log("wallet...");
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(walletMnemonic, {
    prefix: network.prefix,
  });
  console.log("wallet created: ", wallet);

  console.log("creating client...");
  const client = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    wallet
  );

  console.log("execute transaction with user:", user);
  const { transactionHash } = await client.execute(
    walletAddress,
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
  loadScoreboard();
  console.log("hash:", transactionHash);
}
