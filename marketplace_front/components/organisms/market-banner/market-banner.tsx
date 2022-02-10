import classNames from 'classnames';
import Link from 'next/link';

import styles from './market-banner.module.scss';

interface Props {
  className?: string;
}

export const MarketBanner = ({ className }: Props) => {
  return  <Link href={'/market'}>
            <section className={classNames(className, styles.wrapper)}>마켓 보러가기 {'->'}</section>
          </Link>
};
