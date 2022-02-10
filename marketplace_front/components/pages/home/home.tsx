import { MarketBanner } from '../../organisms';
import { Layout, HomeTokenList, CreateToken, HomeTransferHistory } from '../../templates';

import { useAddress } from './home.query';

import styles from './home.module.scss';

export const Home = () => {
  const { data: address, isLoading } = useAddress();

  const msg =
    typeof window === 'undefined' || isLoading
      ? ''
      : address
      ? `logged in as ${address}`
      : 'Please check if metamask is connected.';
  console.log(msg);

  return (
    <Layout className={styles.wrapper}>
      <HomeTokenList className={styles.tokenList} />
      <MarketBanner className={styles.goMarket} />
      <CreateToken />
      <HomeTransferHistory />
    </Layout>
  );
};
