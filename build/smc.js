import { signingClient, walletAddress } from "../src/keplr";
import { getUserLocal, saveUserLocal } from "../src/utils";

console.log("init smc module...");

export async function executeStoreWinner(score) {
  console.log("score", score);
  let nickName = document.getElementById("nickName").value;
  if (!nickName) {
    nickName = "undefined";
  }

  let userToStore = {
    name: nickName,
    address: "cosmosXXXXXXXXXXXXXXXXXXXXXXX",
    score: score,
  };

  // TODO: add method to check if user beat the record before the smart contract execution
  let storedUsers = getUserLocal();
  if (storedUsers && storedUsers.length == 100) {
    storedUsers.sort((a, b) => b.score - a.score);
    lastUser = storedUsers[storedUsers.length - 1];
    let betterThenLast = userToStore.score >= lastUser.score;
    if (betterThenLast) {
      storedUsers.pop();
      storedUsers.push(userToStore);
      saveUserLocal(storedUsers);
      saveUserContact(userToStore);
    }
  } else {
    storedUsers.push(userToStore);
    saveUserLocal(storedUsers);
    saveUserContact(userToStore);
  }
}

export function saveUserContact(user) {
  signingClient
    .execute(
      // TODO: add execution of a smart contract instead of increment test (it is not ready yet)
      walletAddress[0].address,
      "archway17ef78dfdajz7hzzky6dev8dccmsczwktuzfwcrnfgs4rlk6qxkqs7ampla",
      { increment: {} },
      "auto"
    )
    .then((response) => {
      console.log("executed after finishing the game. Response: ", response);
      alert(
        `execute smart contract\n User ${user.name}: with score: ${user.score}`
      );
    });
}
