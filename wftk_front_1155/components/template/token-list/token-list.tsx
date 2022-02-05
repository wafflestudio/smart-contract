import { useTokenList } from './token-list.queries';
import { Typography } from '../../atom/typography/typography';
import Link from 'next/link';

import styles from './token-list.module.scss';
import classNames from 'classnames';

interface Props {
  className?: string;
}

export const TokenList = ({ className }: Props) => {
  const { data: tokenList } = useTokenList();

  return (
    <ul className={classNames(className, styles.list)}>
      {tokenList?.map((item, i) => (
        <Link key={i} href={`/waffle/${item.id}`} passHref>
          <li className={styles.item}>
            <Typography as={'h5'}>{item.name}</Typography>
          </li>
        </Link>
      ))}
    </ul>
  );
};
