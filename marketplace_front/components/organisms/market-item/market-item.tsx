import toast from 'react-hot-toast';

import { useMetamaskContext } from '../../../contexts/metamaskContext';
import { marketContract, provider } from '../../../library/ether';
import { Typography } from '../../atoms';
import { Order, OrderStatus } from '../../pages/market/market.queries';
import { buy721 } from '../../pages/buyAndSell';

import styles from './market-item.module.scss';

interface Props {
  order: Order;
}

export const MarketItem = ({ order }: Props) => {
  const { address } = useMetamaskContext();
  const cancel = async () => {
    try {
      const signer = provider?.getSigner();
      const daiWithSigner = signer && marketContract.connect(signer);
      await daiWithSigner.cancelOrder(order.maker, 1);
      toast.success('취소되었습니다.');
    } catch (err) {
      toast.error('오류가 발생했습니다.');
    }
  };

  return (
    <article className={styles.wrapper}>
      <Typography className={styles.idLabel} as="label">
        {order.id._hex}
      </Typography>
      <Typography className={styles.statusLabel} as="label">
        {{ [OrderStatus.CANCELED]: '취소', [OrderStatus.COMPLETED]: '완료', [OrderStatus.ON_SALE]: '판매 중' }[order.status]}
      </Typography>
      {order.maker?.toLowerCase() === address?.toLowerCase() && (
        <Typography className={styles.cancelLabel} as="label" onClick={cancel}>
          취소
        </Typography>
      )}
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
      <button
        className={styles.buyLabel}
        onClick={() => {
          buy721(999, 999); // example
        }}
      >
        사기
      </button>
    </article>
  );
};
