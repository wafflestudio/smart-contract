import { useQuery } from 'react-query';
import { contract } from '../../../library/ethers';
import {
  Flavor,
  Token,
} from '../../organization/token-list/token-list.queries';

interface Waffle {
  flavor: Flavor;
  hor: [number, number, number];
  ver: [number, number, number];
}

export const useWaffle = (id: number | null) => {
  const enabled =
    typeof id === 'number' &&
    !!contract &&
    'idToWaffle' in contract &&
    'showHorizontals' in contract &&
    'showVerticals' in contract;

  return useQuery(
    ['waffle', id],
    async () => {
      if (!enabled) {
        throw 'wrong usage of useWaffle'; // cannot react here
      }

      const tokenId = id * 3;
      const token: Token = await contract!.idToWaffle(tokenId);
      const hor: [number, number] = await contract!.showHorizontals(tokenId);
      const ver: [number, number] = await contract!.showVerticals(tokenId);
      return { token, hor, ver };
    },
    {
      enabled,
      select: ({ token, hor, ver }): Waffle => ({
        flavor: token.flavor,
        hor: [hor[0], hor[1] - hor[0], 8 - hor[1]],
        ver: [ver[0], ver[1] - ver[0], 8 - ver[1]],
      }),
    }
  );
};
