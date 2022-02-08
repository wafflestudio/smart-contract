import { HomeTransferHistory, MarketBanner } from '../../organisms';
import { Layout, HomeTokenList, CreateToken } from '../../templates';
import { BuyModal, SellModal } from '../../modals';
import styles from './home.module.scss';

export const Home = () => {
  // const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  return (
    <Layout className={styles.wrapper}>
      <HomeTokenList className={styles.tokenList} />
      <MarketBanner className={styles.goMarket} />
      <CreateToken />
      <HomeTransferHistory />
      <BuyModal />
    </Layout>
  );
};
