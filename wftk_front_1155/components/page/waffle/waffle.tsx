import { useWaffle } from './waffle.queries';
import { useRouter } from 'next/router';
import styles from './waffle.module.scss';
import { MutatingDots } from 'react-loader-spinner';
import { $waffle_brown, $waffle_pink } from '../../../styles/palette';
import { WaffleDisplay } from '../../organization/waffle-display/waffle-display';
import { PageTitle } from '../../molecule/page-title/page-title';

export const Waffle = () => {
  const router = useRouter();

  const id =
    typeof router.query.id === 'string' ? Number(router.query.id) : null;

  const { data: waffle } = useWaffle(id);

  if (!waffle)
    return (
      <MutatingDots
        width={100}
        height={100}
        color={$waffle_brown}
        secondaryColor={$waffle_pink}
        wrapperClass={styles.loader}
      />
    );

  const { hor, ver, token, svg, owner } = waffle;

  return (
    <div className={styles.wrapper}>
      <PageTitle title={token.name} content={`owner address: ${owner}`} />
      <table className={styles.waffleTable}>
        <thead>
          <tr>
            <th>ERC-721</th>
            <th>ERC-1155</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <WaffleDisplay
                hor={hor}
                ver={ver}
                flavor={token.flavor}
                className={styles.waffleWrapper}
              />
            </td>
            <td>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
