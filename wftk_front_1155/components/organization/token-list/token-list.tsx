import { useTokenList } from './token-list.queries';
import { Typography } from '../../atom/typography/typography';
import Link from 'next/link';

import styles from './token-list.module.scss';
import classNames from 'classnames';
import { FLAVOR_COLOR_MAP, FLAVOR_LABEL_MAP } from '../../../library/flavor';

interface Props {
  className?: string;
}

export const TokenList = ({ className }: Props) => {
  const { data: tokenList } = useTokenList();

  return (
    <ul className={classNames(className, styles.list)}>
      {tokenList?.map((item, i) => (
        <Link key={i} href={`/waffle/${item.id}`} passHref>
          <li
            className={styles.item}
            style={{ backgroundColor: FLAVOR_COLOR_MAP[item.flavor] }}
          >
            <Typography as={'h3'}>{item.name}</Typography>
            <Typography as={'h6'}>{FLAVOR_LABEL_MAP[item.flavor]}</Typography>
          </li>
        </Link>
      ))}
    </ul>
  );
};
