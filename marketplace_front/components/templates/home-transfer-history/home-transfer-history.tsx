import Link from 'next/link';

import { Typography } from '../../atoms';
import { TinyList } from '../../organisms';

import styles from './home-transfer-history.module.scss';

export const HomeTransferHistory = () => {
  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <Typography as="h3">이용내역</Typography>
        <Link href="/">{'자세히 보기 ->'}</Link>
      </header>
      <TinyList
        dataSource={[
          { label: 'Lorem', caption: '1분 전' },
          { label: 'Lorem', caption: '10분 전' },
          { label: 'Ipsum', caption: '1억년 전' },
          { label: 'Lorem', caption: '옛날이' },
          { label: 'Ipsum', caption: '너무나' },
          { label: 'Lorem', caption: '그리워' },
          { label: 'Ipsum', caption: '보고픈' },
          { label: 'Lorem', caption: '엄마찾아' },
          { label: 'Ipsum', caption: '모두함께' },
          { label: 'Lorem', caption: '나가자' },
        ]}
      />
    </section>
  );
};
