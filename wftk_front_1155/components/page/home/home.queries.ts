import { useQuery } from 'react-query';
import { provider } from '../../../library/ethers';
import toast from 'react-hot-toast';

export const useAddress = () =>
  useQuery<string>(
    'address',
    async () => {
      if (!provider) throw Error;
      const addressList = await provider.send('eth_requestAccounts', []);
      if (addressList.length !== 1) throw Error;
      return addressList;
    },
    {
      onError: () => {
        toast.error(
          'Metamask 에 계정이 한 개 올바르게 연결되어 있는지 확인해 주세요.'
        );
      },
      enabled: !!provider,
    }
  );
