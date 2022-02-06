import { useQuery } from 'react-query';
import { contract } from '../../../library/ethers';
import { Token } from '../../organization/token-list/token-list.queries';

interface Waffle {
  token: Token;
  hor: [number, number];
  ver: [number, number];
}

export const useWaffle = (id: number | null) => {
  const enabled =
    typeof id === 'number' &&
    !!contract &&
    'idToWaffle' in contract &&
    'showHorizontals' in contract &&
    'showVerticals' in contract;

  return useQuery<Waffle>(
    ['waffle', id],
    async () => {
      if (!enabled) {
        throw 'wrong usage of useWaffle'; // cannot react here
      }

      const tokenId = id * 3;
      const token = await contract!.idToWaffle(tokenId);
      const hor = await contract!.showHorizontals(tokenId);
      const ver = await contract!.showVerticals(tokenId);
      return { token, hor, ver };
    },
    {
      enabled,
    }
  );
};
