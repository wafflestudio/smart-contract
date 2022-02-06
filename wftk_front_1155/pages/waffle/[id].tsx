import type { NextPage } from 'next';
import { Layout } from '../../components/template/layout/layout';
import { Waffle } from '../../components/page/waffle/waffle';

const WafflePage: NextPage = () => {
  return (
    <Layout>
      <Waffle />
    </Layout>
  );
};

export default WafflePage;
