import { ethers } from 'ethers';

import { marketAbi, marketAddress } from './contracts';
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

export const marketContract = new ethers.Contract(marketAddress, marketAbi, provider);
