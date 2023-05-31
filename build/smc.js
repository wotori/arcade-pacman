import { signingClient, walletAddress } from "../src/keplr";

console.log("init smc module...");

export async function executeSmartContract(score) {
  console.log("score", score);
  let nickName = document.getElementById("nickName").value;
  if (!nickName) {
    nickName = "undefined";
  }

  // TODO: add method to check if user beat the record before the smart contract execution
  console.log("Execute smart contract with storing the user record");
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
      alert(`execute smart contract\n User ${nickName}: with score: ${score}`);
    });
}
