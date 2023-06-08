import { backendClient, smartContract, walletAddress } from "./keplr";
import { loadScoreboard } from "./init";

const fee = {
  amount: [
    {
      denom: "aconst",
      amount: "350000000000000000",
    },
  ],
  gas: "350000", // specify more gas if needed
};

export async function saveUserContactBackend(user) {
  // TODO: this should work at the backend side
  console.log("execute transaction with user:", user);
  const { transactionHash } = await backendClient.execute(
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
    // "auto"
    fee
  );
  loadScoreboard();
  console.log("hash:", transactionHash);
}
