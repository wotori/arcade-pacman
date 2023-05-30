import { GameCoordinator } from "./app";
import { executeTransaction } from "../src/execute";
import styles from "./app.css";

export function initCoordinator() {
  console.log("init coordinator");
  let gameCoordinator = new GameCoordinator();
  console.log("gameCoordinator is laoded", gameCoordinator);
}

async function loadScoreboard() {
  const responseList = document.getElementById("scoreboard");

  // const response = await fetch("https://api.github.com/users/hadley/orgs");
  // const jsonData = await response.json();
  // console.log(jsonData);

  // for (let i = 0; i < jsonData.length; i++) {
  //   console.log("iterating...", i)
  //   const name = jsonData[i].login;
  //   const scoreElements = document.createElement("div");
  //   scoreElements.innerHTML = `<a>${name}</a>`;
  //   responseList.appendChild(scoreElements);
  // }

  for (let i = 0; i < 100; i++) {
    const userName = "Wotori";
    const scoreElements = document.createElement("div");
    scoreElements.innerHTML = `<p style="margin: 3px">${
      i + 1
    } - ${userName} - score</p>`;
    responseList.appendChild(scoreElements);
  }
}

window.onload = () => {
  initCoordinator();
  loadScoreboard();
  executeTransaction()
};
