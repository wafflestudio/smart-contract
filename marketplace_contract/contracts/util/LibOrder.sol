// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./LibAsset.sol";

library LibOrder {
    struct Order {
        address maker;
        LibAsset.Asset makeAsset;
        address taker;
        LibAsset.Asset takeAsset;
        uint256 salt;
    }
}
