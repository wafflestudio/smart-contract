import { useWaffle } from './waffle.queries';
import { useRouter } from 'next/router';

export const Waffle = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const { data: waffle } = useWaffle(id);

  console.log(waffle);

  return <div></div>;
};
