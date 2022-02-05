import { useQuery } from 'react-query';
import { contract } from '../../../library/ethers';

export interface Token {
  flavor: number;
  name: string;
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
      select: (data) => data.filter((i) => i.name),
    }
  );
