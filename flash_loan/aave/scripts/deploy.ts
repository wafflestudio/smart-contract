// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // LendingPool 관련 컨트랙트 주소를 알려주기 위한 컨트랙트
  // Mainnet 주소. hardhat + alchemy로 Mainnet fork해서 테스트할 수 있다
  const lendingPoolAddressesProvider =
    "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8";
  const dai = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  const FlashLoanContract = await ethers.getContractFactory("FlashloanV1");
  const flashLoanContract = await FlashLoanContract.deploy(
    lendingPoolAddressesProvider
  );

  await flashLoanContract.deployed();
  console.log("flashLoanContract deployed to:", flashLoanContract.address);

  const tx = await flashLoanContract.flashloan(dai);
  console.log(tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
