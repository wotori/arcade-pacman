// solanaWallet.js
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

const connectButton = document.getElementById("wallet-button");
const walletAddressDisplay = document.getElementById("wallet-address");

// Initialize connection to Devnet
const network = clusterApiUrl("devnet");
const connection = new Connection(network);

let walletAddress = null;

// Function to update the button and address display
function updateUI() {
  if (walletAddress) {
    connectButton.textContent = "Disconnect";
    connectButton.classList.add("connected");
    connectButton.classList.remove("disconnected");
    walletAddressDisplay.textContent = `Wallet Address: ${walletAddress}`;
    walletAddressDisplay.classList.add("visible");
  } else {
    connectButton.textContent = "Connect Solana Phantom";
    connectButton.classList.add("disconnected");
    connectButton.classList.remove("connected");
    walletAddressDisplay.textContent = "Address: ";
    walletAddressDisplay.classList.remove("visible");
  }
}

// Function to connect to the Phantom wallet
async function connectSolanaWallet() {
  if (window.solana && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect();
      walletAddress = response.publicKey.toString();
      updateUI();
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    alert("Please install the Phantom wallet extension!");
  }
}

// Function to disconnect from the Phantom wallet
function disconnectSolanaWallet() {
  if (window.solana) {
    window.solana.disconnect();
    walletAddress = null;
    updateUI();
  }
}

// Event listener for the wallet button
connectButton.addEventListener("click", () => {
  if (walletAddress) {
    disconnectSolanaWallet();
  } else {
    connectSolanaWallet();
  }
});

// Initialize wallet connection on page load
export function initSolana() {
  window.addEventListener("load", () => {
    if (window.solana && window.solana.isPhantom) {
      console.log("Phantom wallet found.");
      // Optionally, check if already connected
      window.solana
        .connect({ onlyIfTrusted: true })
        .then((response) => {
          walletAddress = response.publicKey.toString();
          updateUI();
        })
        .catch(() => {
          // Not connected yet
          updateUI();
        });
    } else {
      console.log(
        "Phantom wallet not found. Please install it from the Chrome Web Store."
      );
    }
  });
}
