import { ethers } from 'ethers';

import {
  nftProxyAddress,
  exchangeAddress,
  exchangeAbi,
  erc1155Abi,
  erc1155Address,
  erc721Abi,
  erc721Address,
  erc20Address,
  erc20Abi,
  erc20ProxyAddress,
} from '../../library/contracts'; // 각종 address 주소와 abi는 여기에 넣어놨습니다.
import { provider } from '../../library/ether';
import { asset, encodeAbi, ERC721, ERC20, ERC1155 } from '../../library/util'; // 각종 utils

export const sell721 = async (price: number | null, token_id: number | null) => {
  try {
    const signer = provider.getSigner(); // Signer
    const orderMakerAddress = await signer.getAddress(); // 이용자 주소
    const contract721 = new ethers.Contract(erc721Address, erc721Abi, signer); // 팔고자 하는 erc721 contract를 복구한다.
    await contract721.approve(nftProxyAddress, token_id); // 팔고자 하는 erc721 contract를 nftProxyAddress에서 approve받는다.

    const contract20 = new ethers.Contract(erc20Address, erc20Abi, signer); // 팔고자 하는 erc721 contract를 복구한다.
    const waffleExchangeContract = new ethers.Contract(exchangeAddress, exchangeAbi, signer); // 리퀘를 보낼 waffleExchange contract를 복구한다.
    const makeAsset = asset(ERC721, encodeAbi(contract721.address, token_id!), 1); // 팔고자 하는 erc721의 정보를 파싱해준다.
    const takeAsset = asset(ERC20, encodeAbi(contract20.address), price!); // 팔때 erc20 토큰을 얼마나 받을지 정보를 파싱해준다.
    console.log(makeAsset);
    console.log(takeAsset);

    await waffleExchangeContract.registerOrder(orderMakerAddress, makeAsset, takeAsset); // 최종적으로 전송한다.
  } catch (err) {
    console.log(err);
  }
};

export const sell1155 = async (price: number | null, token_id: number | null) => {
  try {
    const signer = provider.getSigner(); // Signer
    const orderMakerAddress = await signer.getAddress(); // 이용자 주소
    const contract1155 = new ethers.Contract(erc1155Address, erc1155Abi, signer); // 팔고자 하는 erc721 contract를 복구한다.
    await contract1155.setApprovalForAll(nftProxyAddress, true); // 팔고자 하는 erc721 contract를 nftProxyAddress에서 approve받는다.

    const contract20 = new ethers.Contract(erc20Address, erc20Abi, signer); // 팔고자 하는 erc721 contract를 복구한다.
    const waffleExchangeContract = new ethers.Contract(exchangeAddress, exchangeAbi, signer); // 리퀘를 보낼 waffleExchange contract를 복구한다.
    const makeAsset = asset(ERC1155, encodeAbi(contract1155.address, token_id!), 1); // 팔고자 하는 erc721의 정보를 파싱해준다.
    const takeAsset = asset(ERC20, encodeAbi(contract20.address), price!); // 팔때 erc20 토큰을 얼마나 받을지 정보를 파싱해준다.
    console.log(makeAsset);
    console.log(takeAsset);

    await waffleExchangeContract.registerOrder(orderMakerAddress, makeAsset, takeAsset); // 최종적으로 전송한다.
  } catch (err) {
    console.log(err);
  }
};

export const buy721 = async (price: number | null, marketplace_id: number | null) => {
  try {
    const signer = provider.getSigner(); // Signer
    const orderTakerAddress = await signer.getAddress(); // 이용자 주소

    const contract20 = new ethers.Contract(erc20Address, erc20Abi, signer); //
    await contract20.approve(erc20ProxyAddress, 17); //

    const waffleExchangeContract = new ethers.Contract(exchangeAddress, exchangeAbi, signer);

    const takeAsset = asset(ERC20, encodeAbi(contract20.address), price!);

    await waffleExchangeContract.matchOrder(orderTakerAddress, marketplace_id, takeAsset);
  } catch (err) {
    console.log(err);
  }
};
