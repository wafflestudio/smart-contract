// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  console.log("on deploying...");

  const nftProxy = await (
    await ethers.getContractFactory("NftTransferProxy")
  ).deploy();

  await nftProxy.deployed();
  console.log("nftProxy address : ", nftProxy.address);

  const erc20Proxy = await (
    await ethers.getContractFactory("ERC20TransferProxy")
  ).deploy();

  await erc20Proxy.deployed();
  console.log("erc20proxy address : ", erc20Proxy.address);

  const fee = 30;

  const waffleExchange = await (
    await ethers.getContractFactory("WaffleExchange")
  ).deploy(nftProxy.address, erc20Proxy.address, fee);

  await waffleExchange.deployed();
  console.log("waffleExchange deployed, address : ", waffleExchange.address);

  await nftProxy.__TransferProxy_init();
  await erc20Proxy.__ERC20TransferProxy_init();
  console.log("proxies initialized");

  await nftProxy.addOperator(waffleExchange.address);
  await erc20Proxy.addOperator(waffleExchange.address);
  console.log("waffleExchange added to proxies as operator");
  console.log("Contracts deployment and proxy setting completed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
