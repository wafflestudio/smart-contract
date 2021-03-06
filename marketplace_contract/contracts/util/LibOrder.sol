// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LibAsset.sol";

library LibOrder {
    enum OrderStatus {
        canceled,
        completed,
        onSale
    }

    struct Order {
        address maker;
        LibAsset.Asset makeAsset;
        address taker;
        LibAsset.Asset takeAsset;
        uint256 id;
        OrderStatus status;
    }
}
