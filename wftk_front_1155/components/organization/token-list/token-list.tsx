import { Typography } from '../../atom/typography/typography';
import Link from 'next/link';

import styles from './token-list.module.scss';
import classNames from 'classnames';
import { FLAVOR_COLOR_MAP, FLAVOR_LABEL_MAP } from '../../../library/flavor';
import { MutatingDots } from 'react-loader-spinner';
import { $waffle_brown, $waffle_pink } from '../../../styles/palette';
import { Token } from '../../page/home/home.queries';

interface Props {
  className?: string;
  tokenList?: Token[];
}

export const TokenList = ({ className, tokenList }: Props) => {
  return (
    <ul className={classNames(className, styles.list)}>
      {tokenList ? (
        tokenList.map((item, i) => (
          <Link key={i} href={`/waffle/${item.id}`} passHref>
            <li
              className={styles.item}
              style={{ backgroundColor: FLAVOR_COLOR_MAP[item.flavor] }}
            >
              <Typography as={'h3'}>{item.name}</Typography>
              <Typography as={'h6'}>{FLAVOR_LABEL_MAP[item.flavor]}</Typography>
            </li>
          </Link>
        ))
      ) : (
        <MutatingDots
          width={'100%'}
          height={100}
          color={$waffle_brown}
          secondaryColor={$waffle_pink}
        />
      )}
    </ul>
  );
};
