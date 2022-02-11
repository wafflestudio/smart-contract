import React from 'react';

import { Typography } from '../../atoms';
import { MarketItem } from '../../organisms';
import { Layout } from '../../templates';

import { useOrders } from './market.queries';

import styles from './market.module.scss';

export function Market() {
  const { data } = useOrders();

  return (
    <Layout>
      <Typography as="h1">마켓</Typography>
      <ul className={styles.list}>
        {data?.map((order) => (
          <li key={order.id._hex}>
            <MarketItem order={order} />
          </li>
        ))}
      </ul>
    </Layout>
  );
}
