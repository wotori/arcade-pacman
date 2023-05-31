export function saveUserLocal(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUserLocal() {
  let users = localStorage.getItem("users");
  if (users) {
    return JSON.parse(localStorage.getItem("users"));
  } else {
    return undefined;
  }
}

export function saveWinnerLocal(winner) {
  localStorage.setItem("winner", JSON.stringify(winner));
}

export function getWinnerLocal() {
  let winner = localStorage.getItem("winner");
  if (winner) {
    return JSON.parse(localStorage.getItem("winner")).score;
  } else {
    return undefined;
  }
}
