export const exchangeAddress = '0x772DC60fE0c93D5D5a71a3160283c81dAd786BBA';
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
export const nftProxyAddress = '0xf5B76024765Bd84917701E740CE4Be434DA5de1A';
export const erc20ProxyAddress = '0x449845B00eE150EFc3aa89d120FC41dA02017554';

export const erc1155Address = '0x19C08EbbC9Cf5DCe3d74e6AF8f94f99fEa81a30A';
export const erc1155Abi = [
  { inputs: [{ internalType: 'string', name: 'uri', type: 'string' }], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
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
      { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
      { indexed: false, internalType: 'uint256[]', name: 'values', type: 'uint256[]' },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'operator', type: 'address' },
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'id', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'value', type: 'string' },
      { indexed: true, internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'URI',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: 'accounts', type: 'address[]' },
      { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'claimRandomWaffle',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'idToWaffle',
    outputs: [
      { internalType: 'string', name: 'name', type: 'string' },
      { internalType: 'enum Waffle.Flavor', name: 'flavor', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'account', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tokenId', type: 'uint8' }],
    name: 'metadataURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
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
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256[]', name: 'ids', type: 'uint256[]' },
      { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'id', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'uri_', type: 'string' }],
    name: 'setURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tokenId', type: 'uint8' }],
    name: 'showHorizontals',
    outputs: [{ internalType: 'uint8[2]', name: '', type: 'uint8[2]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'showTaken',
    outputs: [{ internalType: 'bool[36]', name: '', type: 'bool[36]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint8', name: 'tokenId', type: 'uint8' }],
    name: 'showVerticals',
    outputs: [{ internalType: 'uint8[2]', name: '', type: 'uint8[2]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'taken',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'takenCount',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'uri',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'waffleToOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const erc721Address = '0x6bf4b681e0ba203e43cc6e4d1c96544358b35fb7';
export const erc721Abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'UriChanged',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '_balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'getApproved',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToWaffle',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'enum Waffle.Flavor',
        name: 'flavor',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'isApprovedForAll',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ownerOf',
    outputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: '_data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'baseURI',
        type: 'string',
      },
    ],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tokenId',
        type: 'uint8',
      },
    ],
    name: 'showHorizontals',
    outputs: [
      {
        internalType: 'uint8[2]',
        name: '',
        type: 'uint8[2]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'tokenId',
        type: 'uint8',
      },
    ],
    name: 'showVerticals',
    outputs: [
      {
        internalType: 'uint8[2]',
        name: '',
        type: 'uint8[2]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4',
      },
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'takeOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'waffleToOwner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint8[2]',
        name: 'horizontals',
        type: 'uint8[2]',
      },
      {
        internalType: 'uint8[2]',
        name: 'verticals',
        type: 'uint8[2]',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
];
