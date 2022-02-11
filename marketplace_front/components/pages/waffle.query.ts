import { ethers, Contract } from 'ethers';
import { nftProxyAddress, waffleTokenAbi, exchangeAddress, exchangeAbi } from '../../library/contracts'; // 각종 address 주소와 abi는 여기에 넣어놨습니다.
import { asset, encodeAbi, ERC721, ERC20 } from '../../library/util'; // 각종 utils
import { provider } from '../../library/ether';
import { useQuery } from 'react-query';

export const sell721 = (erc20ContractAddress: string | null, erc721ContractAddress: string | null, price: number | null) => {
  return useQuery([], async () => {
    const signer = provider.getSigner(); // Signer
    const orderMakerAddress = await signer.getAddress(); // 이용자 주소
    const contract721 = new ethers.Contract(erc721ContractAddress!, waffleTokenAbi, signer); // 팔고자 하는 erc721 contract를 복구한다.
    const waffleExchangeContract = new ethers.Contract(exchangeAddress, exchangeAbi, signer); // 리퀘를 보낼 waffleExchange contract를 복구한다.
    // 여기 signer가 이렇게 들어가는게 맞는지 모르겠습니다..
    const makeAsset = asset(ERC721, encodeAbi(erc721ContractAddress!, 1), 1); // 팔고자 하는 erc721의 정보를 파싱해준다.
    const takeAsset = asset(ERC20, encodeAbi(erc20ContractAddress!), price!); // 팔때 erc20 토큰을 얼마나 받을지 정보를 파싱해준다.

    await contract721.approve(nftProxyAddress, 1); // 팔고자 하는 erc721 contract를 nftProxyAddress에서 approve받는다.
    await waffleExchangeContract.registerOrder(orderMakerAddress, makeAsset, takeAsset); // 최종적으로 전송한다.
  });
};

export const buy721 = () {
  
}
// export const sell721 = () => {};
