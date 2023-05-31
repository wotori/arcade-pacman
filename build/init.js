import { GameCoordinator } from "./app";
import { executeTransaction } from "../src/execute";
import styles from "./app.css";
import { connectKeplr, loadData } from "../src/keplr";
import { getUserLocal, saveUserLocal, saveWinnerLocal } from "../src/utils";

export function initCoordinator() {
  console.log("init coordinator");
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

export async function loadScoreboard() {
  const responseList = document.getElementById("scoreboard");
  while (responseList.firstChild) {
    responseList.removeChild(responseList.firstChild);
  }  
  let users = getUserLocal()
  if ( users ) {
    users.sort((a, b) => b.score - a.score)
    saveWinnerLocal(users[0])
    for (let i = 0; i < users.length; i++) {
      const userName = users[i].name;
      const score = users[i].score;
      const address = users[i].address;
      const abbreviatedAddress = `${address.substring(0, 4)}...${address.substring(address.length - 3)}`
      const scoreElements = document.createElement("div");
      const line = `${(i + 1).toString().padEnd(4, "_")}${userName.padEnd(15, "_")}${abbreviatedAddress.padEnd(15, "_")}score:${score}`;
      scoreElements.innerHTML = `<p style="margin: 3px">
      ${line}</p>`;
      responseList.appendChild(scoreElements);
    }
  } else {
    saveUserLocal([])
  }; 
}

window.onload = () => {
  initCoordinator();
  loadScoreboard();
  connectKeplr();
  loadData();
  // executeTransaction() // test transaction
};
