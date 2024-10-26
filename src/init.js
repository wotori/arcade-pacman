import { executeTransaction, saveUserContactBackend } from "./execute";
import styles from "../app/app.css";
import { connectKeplr, initKeplr, signingClient, smartContract } from "./keplr";
import { getUserLocal, saveUserLocal, saveWinnerLocal } from "./utils";
import { GameCoordinator } from "../app/scripts/core/gameCoordinator";
import { initSolana } from "./solanaWallet";

export function initCoordinator() {
  console.log("init coordinator: ", GameCoordinator);
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

export async function loadScoreboard() {
  let scoreboardAddress = smartContract;
  let response = await signingClient.queryContractSmart(scoreboardAddress, {
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

window.onload = async () => {
  initCoordinator();
  // await initKeplr();
  initSolana();
  connectWallet();
  loadScoreboard();
  // executeTransaction() // test transaction
  document.getElementById("test-store").addEventListener("click", function () {
    const user = { name: "Wotori", address: "archway####", score: 27127 };
    saveUserContactBackend(user);
  });
};
