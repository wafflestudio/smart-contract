// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const WaffleExchange = await ethers.getContractFactory("WaffleExchange");
  // // FIXME: nftProxy address, erc20Proxy address
  // const waffleExchange = await WaffleExchange.deploy("0", "0", 30);

  // await waffleExchange.deployed();
  console.log("on deploying...");

  // const nftProxyFactory = await ethers.getContractFactory("NftTransferProxy");
  // const nftProxy = await nftProxyFactory.deploy();
  // console.log("야야...");
  // console.log(nftProxy);

  // await nftProxy.deployed();
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

  console.log("WaffleExchange deployed to:", waffleExchange.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
