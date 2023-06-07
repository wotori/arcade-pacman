import { executeTransaction } from "./execute";
import styles from "../app/app.css";
import { connectKeplr, initKeplr, signingClient } from "./keplr";
import { getUserLocal, saveUserLocal, saveWinnerLocal } from "./utils";
import { GameCoordinator } from "../app/scripts/core/gameCoordinator";

export function initCoordinator() {
  console.log("init coordinator: ", GameCoordinator);
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

export async function loadScoreboard() {
  // query smc state
  // let incrementAddress =
  //   "archway17ef78dfdajz7hzzky6dev8dccmsczwktuzfwcrnfgs4rlk6qxkqs7ampla";
  // let response = await signingClient.queryContractSmart(incrementAddress, {
  //   get_count: {},
  // });

  let scoreboardAddress =
    "archway1tykvjvpvfqr5g7f8uqqg5du8tp0h99jcgvf05xumtgcq3vf5vajsvp9v2e";
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
    saveWinnerLocal(users[0]);
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
  await initKeplr();
  loadScoreboard();
  // executeTransaction() // test transaction
};
