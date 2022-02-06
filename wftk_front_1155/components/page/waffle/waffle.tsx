import { useWaffle } from './waffle.queries';
import { useRouter } from 'next/router';
import styles from './waffle.module.scss';
import { FLAVOR_COLOR_MAP } from '../../../library/flavor';

export const Waffle = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const { data: waffle } = useWaffle(id);

  if (!waffle) return <div>loading..</div>;

  const { hor, ver, flavor } = waffle;

  return (
    <div
      className={styles.waffle}
      style={{
        gridTemplateRows: ver.join('fr ') + 'fr',
        gridTemplateColumns: hor.join('fr ') + 'fr',
      }}
    >
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={styles.waffleBlock}
            style={{
              backgroundColor: FLAVOR_COLOR_MAP[flavor],
            }}
          />
        ))}
    </div>
  );
};
