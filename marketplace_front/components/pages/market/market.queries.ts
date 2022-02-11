import { BigNumber } from 'ethers';
import { useQuery } from 'react-query';

import { marketContract } from '../../../library/ether';

export enum OrderStatus {
  CANCELED,
  COMPLETED,
  ON_SALE,
}

interface AssetType {
  assetClass: string;
  data: string;
}

interface Asset {
  value: BigNumber;
  assetType: AssetType;
}

export interface Order {
  maker: string;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  id: BigNumber;
  status: OrderStatus;
}

const fetchOrder = async () => {
  const orders: Order[] = await marketContract?.getOrders();
  return orders;
};

export const useOrders = () => useQuery('order', fetchOrder);
