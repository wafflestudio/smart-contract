import classNames from 'classnames';

import { Typography } from '../../atoms/typography/typography';

import styles from './tiny-list.module.scss';

interface Props {
  className?: string;
  dataSource: { label: string; caption?: string }[];
}

export const TinyList = ({ className, dataSource }: Props) => {
  return (
    <ul className={classNames(className, styles.wrapper)}>
      {dataSource.map((item, i) => (
        <li key={i} className={styles.item}>
          <Typography as="p" className={styles.title}>
            {item.label}
          </Typography>
          <Typography as="span" className={styles.caption}>
            {item.caption}
          </Typography>
        </li>
      ))}
    </ul>
  );
};
