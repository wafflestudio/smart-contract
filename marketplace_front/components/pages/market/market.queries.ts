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

  0: string; // assetClass
  1: string; // data
}

interface Asset {
  value: BigNumber;
  assetType: AssetType;

  0: AssetType;
  1: BigNumber;
}
export interface Order {
  maker: string;
  makeAsset: Asset;
  taker: string;
  takeAsset: Asset;
  id: BigNumber;
  status: OrderStatus;

  0: string; // maker
  1: Asset; // makeAsset
  2: string; // taker
  3: Asset; // tkaeAsset
  4: BigNumber; // id
  5: OrderStatus; // status
}

const fetchOrder = async () => {
  const orders: Order[] = await marketContract?.getOrders();
  return orders;
};

export const useOrders = () =>
  useQuery('order', fetchOrder, {
    select: (data) =>
      data.map((order) => ({
        ...order,
        maker: order.maker ?? order[0],
        makeAsset: order.makeAsset ?? {
          value: order[1]?.value ?? order[1]?.[1],
          assetType: order[1]?.assetType ?? { assetClass: order[1]?.[0].assetClass, data: order[1]?.[0].data },
        },
        taker: order.taker ?? order[2],
        takeAsset: order.takeAsset ?? {
          value: order[3]?.value ?? order[3]?.[1],
          assetType: order[3]?.assetType ?? { assetClass: order[3]?.[0].assetClass, data: order[3]?.[0].data },
        },
        id: order.id ?? order[4],
        status: order.status ?? order[5],
      })),
  });
