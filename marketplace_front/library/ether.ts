import { ethers } from 'ethers';
import toast from 'react-hot-toast';

import { erc1155Abi, erc1155Address, erc721Abi, erc721Address, exchangeAbi, exchangeAddress } from './contracts';
export const provider =
  typeof window !== 'undefined' && 'ethereum' in window
    ? new ethers.providers.Web3Provider(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ethereum
      )
    : // If you don't specify a //url//, Ethers connects to the default
      // (i.e. ``http:/\/localhost:8545``)
      new ethers.providers.JsonRpcProvider();

export const marketContract = new ethers.Contract(exchangeAddress, exchangeAbi, provider);
export const erc721Waffle = new ethers.Contract(erc721Address, erc721Abi, provider);
export const erc1155Waffle = new ethers.Contract(erc1155Address, erc1155Abi, provider);
export const connectWallet = async () => {
  try {
    if (!provider) throw Error;
    const addressList: string[] = await provider.send('eth_requestAccounts', []);
    if (addressList.length !== 1) throw Error;
    return addressList[0];
  } catch {
    toast.error('Metamask 에 계정이 올바르게 연결되어 있는지 확인해 주세요.');
    return null;
  }
};
