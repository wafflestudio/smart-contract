export const exchangeAddress = '0x772DC60fE0c93D5D5a71a3160283c81dAd786BBA';
export const nftProxyAddress = '0xf5B76024765Bd84917701E740CE4Be434DA5de1A';
export const erc20ProxyAddress = '0x449845B00eE150EFc3aa89d120FC41dA02017554';
export const waffleTokenAddress = '0x6bf4b681e0ba203e43cc6e4d1c96544358b35fb7';

export const exchangeAbi = [
  {
    inputs: [
      { internalType: 'contract INftTransferProxy', name: 'nftTransferProxy', type: 'address' },
      { internalType: 'contract IERC20TransferProxy', name: 'erc20TransferProxy', type: 'address' },
      { internalType: 'uint8', name: '_exchangeFeeDenominator', type: 'uint8' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'maker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct LibAsset.Asset',
        name: 'makeAsset',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct LibAsset.Asset',
        name: 'takeAsset',
        type: 'tuple',
      },
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'OrderRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes4', name: 'assetType', type: 'bytes4' },
      { indexed: false, internalType: 'address', name: 'proxy', type: 'address' },
    ],
    name: 'ProxyChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        indexed: false,
        internalType: 'struct LibAsset.Asset',
        name: 'asset',
        type: 'tuple',
      },
      { indexed: false, internalType: 'address', name: 'from', type: 'address' },
      { indexed: false, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'Transferred',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'cancelOrder',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getExchangeFee',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOrders',
    outputs: [
      {
        components: [
          { internalType: 'address', name: 'maker', type: 'address' },
          {
            components: [
              {
                components: [
                  { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
                  { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                internalType: 'struct LibAsset.AssetType',
                name: 'assetType',
                type: 'tuple',
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            internalType: 'struct LibAsset.Asset',
            name: 'makeAsset',
            type: 'tuple',
          },
          { internalType: 'address', name: 'taker', type: 'address' },
          {
            components: [
              {
                components: [
                  { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
                  { internalType: 'bytes', name: 'data', type: 'bytes' },
                ],
                internalType: 'struct LibAsset.AssetType',
                name: 'assetType',
                type: 'tuple',
              },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            internalType: 'struct LibAsset.Asset',
            name: 'takeAsset',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'enum LibOrder.OrderStatus', name: 'status', type: 'uint8' },
        ],
        internalType: 'struct LibOrder.Order[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'taker', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'takeAsset',
        type: 'tuple',
      },
    ],
    name: 'matchOrder',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'orderByMaker',
    outputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'makeAsset',
        type: 'tuple',
      },
      { internalType: 'address', name: 'taker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'takeAsset',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'enum LibOrder.OrderStatus', name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'orderOf',
    outputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'makeAsset',
        type: 'tuple',
      },
      { internalType: 'address', name: 'taker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'takeAsset',
        type: 'tuple',
      },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'enum LibOrder.OrderStatus', name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'maker', type: 'address' },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'makeAsset',
        type: 'tuple',
      },
      {
        components: [
          {
            components: [
              { internalType: 'bytes4', name: 'assetClass', type: 'bytes4' },
              { internalType: 'bytes', name: 'data', type: 'bytes' },
            ],
            internalType: 'struct LibAsset.AssetType',
            name: 'assetType',
            type: 'tuple',
          },
          { internalType: 'uint256', name: 'value', type: 'uint256' },
        ],
        internalType: 'struct LibAsset.Asset',
        name: 'takeAsset',
        type: 'tuple',
      },
    ],
    name: 'registerOrder',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'bytes4', name: 'assetType', type: 'bytes4' },
      { internalType: 'address', name: 'proxy', type: 'address' },
    ],
    name: 'setTransferProxy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
