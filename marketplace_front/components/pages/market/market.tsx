import React from 'react';

import { Layout } from '../../templates';

import { useOrders } from './market.queries';

export function Market() {
  const { data } = useOrders();

  console.log(data);

  return (
    <Layout>
      <div>마켓!!</div>
    </Layout>
  );
}
