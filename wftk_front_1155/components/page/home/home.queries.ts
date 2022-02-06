import { useQuery } from 'react-query';
import { provider } from '../../../library/ethers';
import toast from 'react-hot-toast';
import { contract } from '../../../library/ethers';
import { Flavor } from '../../../library/flavor';
import { useCallback } from 'react';

export interface Token {
  flavor: Flavor;
  name: string;
  id: number;
  owner: string;
}

export const useAddress = () =>
  useQuery<string>(
    'address',
    async () => {
      if (!provider) throw Error;
      const addressList: string[] = await provider.send(
        'eth_requestAccounts',
        []
      );
      if (addressList.length !== 1) throw Error;
      return addressList[0];
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

export const useTokenList = (address?: string) =>
  useQuery<Token[]>(
    ['token-list', address],
    async () => {
      const result = await Promise.all(
        // TODO 100 말고 올바른 number
        Array(100)
          .fill(0)
          // @ts-ignore
          .map((_, i) => contract.idToWaffle(i))
      );

      const filtered = result
        .map((token, index) => ({
          name: token.name,
          flavor: token.flavor as Flavor,
          id: index,
        }))
        .filter((token) => token.name);

      return Promise.all(
        filtered.map(
          (token) =>
            new Promise<Token>(async (res) => {
              // @ts-ignore
              const owner = await contract.waffleToOwner(token.id);
              res({ ...token, owner });
            })
        )
      );
    },
    {
      enabled: !!contract && 'idToWaffle' in contract,
      select: useCallback(
        (tokenList: Token[]) => {
          console.log(address);
          console.log(tokenList);
          return address
            ? tokenList.filter(
                (token) => token.owner.toLowerCase() === address.toLowerCase()
              )
            : tokenList;
        },
        [address]
      ),
    }
  );

export const useAddressTokenList = (address?: string) => useTokenList(address);
