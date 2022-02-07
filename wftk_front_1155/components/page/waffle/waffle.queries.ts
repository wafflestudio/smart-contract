import { useQuery } from 'react-query';
import { contract } from '../../../library/ethers';
import toast from 'react-hot-toast';
import { Token } from '../home/home.queries';

interface Waffle {
  token: Token;
  svg: string;
  hor: [number, number, number];
  ver: [number, number, number];
  owner: string;
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
      const metadata: string = await contract!.metadataURI(tokenId);
      const owner = await contract!.waffleToOwner(tokenId);
      const hor: [number, number] = await contract!.showHorizontals(tokenId);
      const ver: [number, number] = await contract!.showVerticals(tokenId);
      return { token, hor, ver, metadata, owner };
    },
    {
      enabled,
      select: ({ token, hor, ver, metadata, owner }): Waffle => ({
        token,
        svg: atob(metadata.substring(29)).split('"svg" : "')[1].slice(0, -2),
        hor: [hor[0], hor[1] - hor[0], 8 - hor[1]],
        ver: [ver[0], ver[1] - ver[0], 8 - ver[1]],
        owner,
      }),
      onError: () => {
        toast.error('An error occurred.');
      },
    }
  );
};
