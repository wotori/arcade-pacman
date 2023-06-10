import {
  backendClient,
  smartContract,
  walletAddress,
  pacmanContract,
} from "./keplr";
import { loadPrizePoolAndTotalDistributed, loadScoreboard } from "./init";

export async function saveUserContactBackend(user) {
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
  await loadScoreboard();
  await loadPrizePoolAndTotalDistributed();
  console.log("hash:", transactionHash);
}
