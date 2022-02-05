import { PageTitle } from '../../molecule/page-title/page-title';
import { useAddress } from './home.queries';
import { TokenList } from '../../template/token-list/token-list';

export const Home = () => {
  const { data: address } = useAddress();

  return (
    <div>
      <PageTitle title={'My Token List'} content={`logged in as ${address}`} />
      <TokenList />
    </div>
  );
};
