import { PageTitle } from '../../molecule/page-title/page-title';
import { useAddress, useAddressTokenList, useTokenList } from './home.queries';
import { TokenList } from '../../organization/token-list/token-list';

import styles from './home.module.scss';
import { Typography } from '../../atom/typography/typography';

export const Home = () => {
  const { data: address, isLoading } = useAddress();

  const { data: tokenList } = useTokenList();
  const { data: myTokenList } = useAddressTokenList(address);

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
      <Typography as={'h2'}>내 토큰</Typography>
      <TokenList className={styles.tokenListWrapper} tokenList={myTokenList} />
      <Typography as={'h2'}>모든 토큰</Typography>
      <TokenList className={styles.tokenListWrapper} tokenList={tokenList} />
    </div>
  );
};
