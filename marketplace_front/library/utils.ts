import { ethers } from 'ethers';
import { AbiCoder } from 'ethers/lib/utils';

import { erc1155Contract, erc721Contract } from './ether';
import { Flavor } from './flavor';
export interface Token {
  flavor: Flavor;
  name: string;
  id: number;
  owner: string;
}
export interface Waffle721 extends Token {
  hor: [number, number, number];
  ver: [number, number, number];
}
export interface Waffle1155 extends Waffle721 {
  metadata: string;
}

export const convertToKeccak4bytes = (value: string) => {
  return ethers.utils.id(value).substring(0, 10);
};

export const ERC721 = convertToKeccak4bytes('ERC721');
export const ERC20 = convertToKeccak4bytes('ERC20');
export const ERC1155 = convertToKeccak4bytes('ERC1155');

export const asset = (assetClass: string, assetData: string, value: number) => {
  return {
    assetType: {
      assetClass: assetClass,
      data: assetData,
    },
    value: value,
  };
};

export const encodeAbi = (tokenAddress: string, tokenId?: number) => {
  const abiCoder = new AbiCoder();
  if (tokenId) {
    return abiCoder.encode(['address', 'uint256'], [tokenAddress, tokenId]);
  } else {
    return abiCoder.encode(['address'], [tokenAddress]);
  }
};

export async function get1155Waffles(myAddress: string) {
  const result = await Promise.all(
    // TODO: 개수 수정
    Array(30)
      .fill(0)
      .map((_, i) => erc1155Contract.idToWaffle(i))
  );
  const filtered = result
    .map((token, index) => ({
      name: token.name,
      flavor: token.flavor as Flavor,
      id: index,
    }))
    .filter((token) => token.name);
  const ownerList = await Promise.all(
    filtered.map(
      (token) =>
        // eslint-disable-next-line no-async-promise-executor
        new Promise<Token>(async (res) => {
          const owner: string = await erc1155Contract.waffleToOwner(token.id);
          const lowerCaseOwner = owner.toLowerCase();
          res({ ...token, owner: lowerCaseOwner });
        })
    )
  );
  const myList = ownerList.filter((tkn) => tkn.owner === myAddress);
  const my1155: Waffle1155[] = await Promise.all(
    myList.map(async (t) => {
      const metadata: string = await erc1155Contract.metadataURI(t.id);
      const hor: [number, number] = await erc1155Contract.showHorizontals(t.id);
      const ver: [number, number] = await erc1155Contract.showVerticals(t.id);
      return { ...t, hor: [hor[0], hor[1] - hor[0], 8 - hor[1]], ver: [ver[0], ver[1] - ver[0], 8 - ver[1]], metadata };
    })
  );
  return my1155;
}

export async function get721Waffles(myAddress: string) {
  const result = await Promise.all(
    // 개수 수정 ?
    Array(37)
      .fill(0)
      .map((_, i) => erc721Contract.idToWaffle(i))
  );
  const filtered = result
    .map((token, index) => ({
      name: token.name,
      flavor: token.flavor as Flavor,
      id: index,
    }))
    .filter((token) => token.name);
  const ownerList = await Promise.all(
    filtered.map(
      (token) =>
        // eslint-disable-next-line no-async-promise-executor
        new Promise<Token>(async (res) => {
          const owner: string = await erc721Contract.waffleToOwner(token.id);
          const lowerCaseOwner = owner.toLowerCase();
          res({ ...token, owner: lowerCaseOwner });
        })
    )
  );
  const myList = ownerList.filter((tkn) => tkn.owner === myAddress);
  const my721: Waffle721[] = await Promise.all(
    myList.map(async (t) => {
      const hor: [number, number] = await erc721Contract.showHorizontals(t.id);
      const ver: [number, number] = await erc721Contract.showVerticals(t.id);
      return { ...t, hor: [hor[0], hor[1] - hor[0], 8 - hor[1]], ver: [ver[0], ver[1] - ver[0], 8 - ver[1]] };
    })
  );
  return my721;
}
