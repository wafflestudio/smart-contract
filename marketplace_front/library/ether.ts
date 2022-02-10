import { ethers } from 'ethers';

export const provider =
  typeof window !== 'undefined' && 'ethereum' in window
    ? new ethers.providers.Web3Provider(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ethereum
      )
    : null;

// export const contract = provider ? new ethers.Contract(WAFFLE_TOKEN_ADDRESS, WAFFLE_TOKEN_ABI, provider) : null;
