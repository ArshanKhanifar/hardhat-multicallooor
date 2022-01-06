import { ethers } from "hardhat";

async function main() {
  const Multicall = await ethers.getContractFactory("Multicall2");
  const multicall = await Multicall.deploy();

  await multicall.deployed();

  console.log("Multicall deployed to:", multicall.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
