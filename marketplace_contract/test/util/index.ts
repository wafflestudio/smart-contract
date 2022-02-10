import { ethers } from "ethers";
import { AbiCoder } from "ethers/lib/utils";

export const convertToKeccak4bytes = (value: string) => {
  return `${ethers.utils.id(value).substring(0, 10)}`;
};

export const ERC721 = convertToKeccak4bytes("ERC721");
export const ERC20 = convertToKeccak4bytes("ERC20");

export const asset = (assetClass: string, assetData: string, value: number) => {
  return {
    assetType: {
      assetClass: assetClass,
      data: assetData,
    },
    value,
  };
};

export const encodeAbi = (tokenAddress: string, tokenId?: number) => {
  const abiCoder = new AbiCoder();
  if (tokenId) {
    return abiCoder.encode(["address", "uint256"], [tokenAddress, tokenId]);
  } else {
    return abiCoder.encode(["address"], [tokenAddress]);
  }
};
