// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../util/LibAsset.sol";
import "../util/LibOrder.sol";

abstract contract IWaffleExchange {
    LibOrder.Order[] public orders;
    mapping(uint256 => LibOrder.Order) public orderOf;

    /**
     * @dev NFT order 등록
     * @return Order Id
     */
    function registerOrder(
        address maker,
        LibAsset.Asset calldata makerAsset,
        LibAsset.Asset calldata takerAsset
    ) external virtual returns (uint256);

    // {
    //     orders.push(Order {
    //         maker,
    //         makerAsset,
    //         address(0),
    //         takerAsset,
    //         onSale
    //     });
    // }

    /**
     * @dev 등록된 NFT order 구매
     * @param taker taker address
     * @param id Order Id
     * @param takerAsset taker asset
     * @return 구매 성공 여부
     */
    function matchOrder(
        address taker,
        uint256 id,
        LibAsset.Asset calldata takerAsset
    ) external virtual returns (bool);

    // {
    //     Order order = orders[id]
    //     _validateOrder(order, ...)
    //     _matchAndTransfer(order)
    // }

    /**
     * @dev 등록된 NFT 취소
     * @return 취소 성공 여부
     */
    function cancelOrder(address maker, uint256 id)
        external
        virtual
        returns (bool);

    function _validateOrder(LibOrder.Order memory order) internal virtual;

    function _matchAndTransfer(LibOrder.Order memory order) internal virtual;

    // {
    //     proxy를 통해 transfer
    // }
}
