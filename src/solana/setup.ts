import { Program, Idl, AnchorProvider } from "@coral-xyz/anchor";
import idl from "./anchor/idl.json";
import { ArcadeRewards } from "./anchor/arcade_rewards";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program(idl as Idl, {
  connection,
}) as unknown as Program<ArcadeRewards>;
console.log("init program: ", program);
