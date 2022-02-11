import { Typography } from '../../atoms';
import { Order, OrderStatus } from '../../pages/market/market.queries';

import styles from './market-item.module.scss';

interface Props {
  order: Order;
}

export const MarketItem = ({ order }: Props) => {
  return (
    <article className={styles.wrapper}>
      <Typography className={styles.idLabel} as="label">
        {order.id._hex}
      </Typography>
      <Typography className={styles.statusLabel} as="label">
        {{ [OrderStatus.CANCELED]: '취소', [OrderStatus.COMPLETED]: '완료', [OrderStatus.ON_SALE]: '판매 중' }[order.status]}
      </Typography>
      <Typography className={styles.description}>
        <strong>Maker</strong> {order.maker}
      </Typography>
      <Typography className={styles.description}>
        <strong>Asset class</strong>
        {order.makeAsset.assetType.assetClass}
      </Typography>
      <Typography className={styles.description}>
        <strong>Asset data</strong>
        {order.makeAsset.assetType.data}
      </Typography>
      <Typography className={styles.description}>
        <strong>Price</strong>
        {order.takeAsset.value._hex}
      </Typography>
    </article>
  );
};
