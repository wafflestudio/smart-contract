import { useWaffle } from './waffle.queries';
import { useRouter } from 'next/router';
import styles from './waffle.module.scss';
import { FLAVOR_COLOR_MAP } from '../../../library/flavor';
import { MutatingDots } from 'react-loader-spinner';
import { $waffle_brown, $waffle_pink } from '../../../styles/palette';

export const Waffle = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const { data: waffle, isLoading } = useWaffle(id);

  if (!waffle || isLoading)
    return (
      <MutatingDots
        width={100}
        height={100}
        color={$waffle_brown}
        secondaryColor={$waffle_pink}
        wrapperClass={styles.loader}
      />
    );

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
