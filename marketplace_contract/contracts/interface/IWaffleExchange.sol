// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../util/LibAsset.sol";
import "../util/LibOrder.sol";

interface IWaffleExchange {
    function makeOrder(
        LibAsset.Asset memory asset,
        LibAsset.Asset memory price,
        address maker
    ) external;

    function takeOrder(LibOrder.Order memory order, address taker) external;

    function transfer(
        LibAsset.Asset memory asset,
        address from,
        address to
    ) external;
}
