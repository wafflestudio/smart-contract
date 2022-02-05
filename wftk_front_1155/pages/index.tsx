import type { NextPage } from 'next';
import { Layout } from '../components/commmon/layout/layout';
import { Home } from '../components/page/';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default HomePage;
