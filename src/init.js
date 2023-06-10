import { executeTransaction, saveUserContactBackend } from "./execute";
import styles from "../app/app.css";
import {
  connectKeplr,
  initBackendWallet,
  initKeplr,
  signingClient,
  smartContract,
} from "./keplr";
import { getUserLocal, saveUserLocal, saveWinnerLocal } from "./utils";
import { GameCoordinator } from "../app/scripts/core/gameCoordinator";

export function initCoordinator() {
  console.log("init coordinator: ", GameCoordinator);
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

export async function loadScoreboard() {
  let response = await signingClient.queryContractSmart(smartContract, {
    ScoreList: {},
  });

  console.log("scoreboard response: ", response.scores);

  const responseList = document.getElementById("scoreboard");
  while (responseList.firstChild) {
    responseList.removeChild(responseList.firstChild);
  }
  // let users = getUserLocal();
  let users = response.scores;
  if (users) {
    users.sort((a, b) => b.score - a.score);
    console.log("sorted users:", users);
    // saveWinnerLocal(users[0]); // localStorage for development without contract
    localStorage.setItem("highScore", users[0].score);
    for (let i = 0; i < users.length; i++) {
      const userName = users[i].name;
      const score = users[i].score;
      const address = users[i].address;
      const abbreviatedAddress = `${address.substring(
        0,
        4
      )}...${address.substring(address.length - 3)}`;
      const scoreElements = document.createElement("div");
      const line = `${(i + 1).toString().padEnd(4, "_")}${userName.padEnd(
        15,
        "_"
      )}${abbreviatedAddress.padEnd(15, "_")}score:${score}`;
      scoreElements.innerHTML = `<p style="margin: 3px">
      ${line}</p>`;
      responseList.appendChild(scoreElements);
    }
  } else {
    saveUserLocal([]);
  }
}

export async function loadPrizePoolAndTotalDistributed() {
  let response = await signingClient.queryContractSmart(smartContract, {
    PrizePool: {},
  });
  let prizePool = response.prize_pool / 10 ** 18;
  console.log("response PrizePool: ", response);

  console.log("prize pool is: ", prizePool);
  let prizePoolElement = document.getElementById("prize-pool");
  prizePoolElement.innerHTML = "Current prize pool is: " + prizePool + " const";

  let response2 = await signingClient.queryContractSmart(smartContract, {
    TotalDistributed: {},
  });
  console.log("response TotalDistributed: ", response2);
  let totalDistributed = response2.total_distributed;
  if (totalDistributed !== "0") {
    totalDistributed = totalDistributed / 10 ** 18;
  }
  let totalDistributedElem = document.getElementById("total-distributed");
  totalDistributedElem.innerHTML =
    "Total prize distributed: " + totalDistributed + " const";

  let response3 = await signingClient.queryContractSmart(smartContract, {
    GameCounter: {},
  });
  console.log("response GameCounter: ", response3);
  let GameCounter = response3.game_counter;
  let gameCounter = document.getElementById("total-games");
  gameCounter.innerHTML = "Games played: " + GameCounter;
}

window.onload = async () => {
  initCoordinator();
  await initBackendWallet();
  await initKeplr();
  await loadScoreboard();
  await loadPrizePoolAndTotalDistributed();
  // executeTransaction() // test transaction
  document.getElementById("test-store").addEventListener("click", function () {
    const user = { name: "Wotori", address: "archway####", score: 27127 };
    saveUserContactBackend(user);
  });
};
