import { loadScoreboard } from "./init";
import { signingClient, walletAddress } from "./keplr";
import { getUserLocal, saveUserLocal } from "./utils";

console.log("init smc module...");

export async function executeStoreWinner(score) {
  console.log("score", score);
  let nickName = document.getElementById("nickName").value;
  if (!nickName) {
    nickName = "undefined";
  }

  let userToStore = {
    name: nickName,
    address: walletAddress,
    score: score,
  };

  // TODO: add method to check if user beat the record before the smart contract execution
  let storedUsers = getUserLocal(); // TODO: read from smart contract instead of local storage
  if (storedUsers && storedUsers.length == 100) {
    // TODO: read contrac max, keep from useless transactions...
    storedUsers.sort((a, b) => b.score - a.score);
    lastUser = storedUsers[storedUsers.length - 1];
    let betterThenLast = userToStore.score >= lastUser.score;
    if (betterThenLast) {
      console.log("user beat previous record...");
      // storedUsers.pop();
      // storedUsers.push(userToStore);
      // saveUserLocal(storedUsers);
      saveUserContact(userToStore);
    }
  } else {
    console.log("still have room for the record...");
    // storedUsers.push(userToStore);
    // saveUserLocal(storedUsers); // save to local storage for development
    saveUserContact(userToStore);
  }
}

export function saveUserContact(user) {
  console.log("save user :", user);
  signingClient
    .execute(
      // TODO: add execution of a smart contract instead of increment test (it is not ready yet)
      walletAddress,
      "archway1tykvjvpvfqr5g7f8uqqg5du8tp0h99jcgvf05xumtgcq3vf5vajsvp9v2e", // TODO: move to global var
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
    )
    .then((response) => {
      console.log("executed after finishing the game. Response: ", response);
      loadScoreboard();
      console.log(
        `execute smart contract\n User ${user.name}: with score: ${user.score}`
      );
    });
}
