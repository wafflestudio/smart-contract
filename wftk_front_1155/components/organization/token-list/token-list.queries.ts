import { useQuery } from 'react-query';
import { contract } from '../../../library/ethers';

export enum Flavor {
  VANILLA,
  PLAIN,
  CHOCOLATE,
}

export interface Token {
  flavor: Flavor;
  name: string;
  id: number;
}

export const useTokenList = () =>
  useQuery<Token[]>(
    'token-list',
    () =>
      Promise.all(
        // TODO 100 말고 올바른 number
        Array(100)
          .fill(0)
          // @ts-ignore
          .map((_, i) => contract.idToWaffle(i))
      ),
    {
      enabled: !!contract && 'idToWaffle' in contract,
      select: (data) =>
        data
          .map((token, index) => ({
            name: token.name,
            flavor: token.flavor as Flavor,
            id: index,
          }))
          .filter((token) => token.name),
    }
  );
