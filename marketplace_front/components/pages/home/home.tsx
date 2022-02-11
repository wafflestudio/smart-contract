import { MarketBanner } from '../../organisms';
import { Layout, HomeTokenList, CreateToken, HomeTransferHistory } from '../../templates';

import styles from './home.module.scss';

export const Home = () => {
  return (
    <Layout className={styles.wrapper}>
      <HomeTokenList className={styles.tokenList} />
      <MarketBanner className={styles.goMarket} />
      <CreateToken />
      <HomeTransferHistory />
    </Layout>
  );
};
