import { useQuery } from 'react-query';

import { marketContract } from '../../../library/ether';

export enum OrderStatus {
  CANCELED,
  COMPLETED,
  ON_SALE,
}

interface AssetType {
  assetClass: unknown; // TODO:
  data: unknown; // TODO:
}

interface Asset {
  value: number;
  assetType: AssetType;
}

interface Order {
  maker: string;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  id: number;
  status: OrderStatus;
}

const fetchOrder = async () => {
  const orders: Order[] = await marketContract?.getOrders();
  return orders;
};

export const useOrders = () => useQuery('order', fetchOrder);
