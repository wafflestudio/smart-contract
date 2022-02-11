import toast from 'react-hot-toast';
import { useQuery } from 'react-query';

import { provider } from '../../../library/ether';

export const useAddress = () =>
  useQuery<string>(
    'address',
    async () => {
      if (!provider) throw Error;
      const addressList: string[] = await provider.send('eth_requestAccounts', []);
      if (addressList.length !== 1) throw Error;
      return addressList[0];
    },
    {
      onError: () => {
        toast.error('Metamask 에 계정이 올바르게 연결되어 있는지 확인해 주세요.');
      },
      enabled: !!provider,
    }
  );

export const buy20 = () => {};

export const buy721 = () => {};

export const sell20 = () => {};
export const sell721 = () => {};
