console.log("init smc module...");

export function executeSmartContract(score) {
  console.log("score", score);
  let nickName = document.getElementById("nickName").value;
  if (!nickName) {
    nickName = "undefined";
  }
  alert(`execute smart contract\n User ${nickName}: with score: ${score}`);
}
