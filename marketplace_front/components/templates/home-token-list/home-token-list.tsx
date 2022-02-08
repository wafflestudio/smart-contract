import classNames from 'classnames';

import styles from './home-token-list.module.scss';

interface Props {
  className?: string;
}

export const HomeTokenList = ({ className }: Props) => {
  return <section className={classNames(className, styles.wrapper)}>내 토큰</section>;
};
