import { PageTitle } from '../../molecule/page-title/page-title';
import { useAddress } from './home.queries';
import { TokenList } from '../../organization/token-list/token-list';

import styles from './home.module.scss';

export const Home = () => {
  const { data: address, isLoading } = useAddress();

  return (
    <div>
      <PageTitle
        title={'My Token List'}
        content={
          typeof window === 'undefined' || isLoading
            ? ''
            : address
            ? `logged in as ${address}`
            : 'Please check if metamask is connected.'
        }
      />
      <TokenList className={styles.tokenListWrapper} />
    </div>
  );
};
