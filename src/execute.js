import { SigningArchwayClient } from "@archwayhq/arch3.js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";

export async function executeTransaction() {
  console.log("execute transaction");
  const network = {
    chainId: "constantine-3",
    endpoint: "https://rpc.constantine.archway.tech",
    prefix: "archway",
  };
  const alice = {
    mnemonic:
      "test",
    address0: "archway1uwew6p8k70xa2lkzeujqcw430uky49zthsvc0y",
  };
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(alice.mnemonic, {
    prefix: network.prefix,
  });
  const client = await SigningArchwayClient.connectWithSigner(
    network.endpoint,
    wallet,
    {
      // ...defaultSigningClientOptions,
      prefix: network.prefix,
    }
  );
  const contractAddress =
    "archway17ef78dfdajz7hzzky6dev8dccmsczwktuzfwcrnfgs4rlk6qxkqs7ampla";
  const msg = {
    increment: {},
  };
  const { transactionHash } = await client.execute(
    alice.address0,
    contractAddress,
    msg,
    "auto"
  );

  console.log("hash:", transactionHash);
}
