import { ethers } from 'ethers';

export const provider =
  typeof window !== 'undefined' && 'ethereum' in window
    ? new ethers.providers.Web3Provider(
        // @ts-ignore
        window.ethereum
      )
    : null;
