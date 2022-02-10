// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../util/LibAsset.sol";
import "../util/LibOrder.sol";

abstract contract IWaffleExchange {
    LibOrder.Order[] orders;
    mapping(uint256 => LibOrder.Order) public orderOf;
    mapping(address => LibOrder.Order) public orderByMaker;

    /**
     * @dev NFT order 등록
     * @return Order Id
     */
    function registerOrder(
        address maker,
        LibAsset.Asset calldata makeAsset,
        LibAsset.Asset calldata takeAsset
    ) external virtual returns (uint256);

    // {
    //     orders.push(Order {
    //         maker,
    //         makeAsset,
    //         address(0),
    //         takeAsset,
    //         onSale
    //     });
    // }

    /**
     * @dev 등록된 NFT order 구매
     * @param taker taker address
     * @param id Order Id
     * @param takeAsset taker asset
     * @return 구매 성공 여부
     */
    function matchOrder(
        address taker,
        uint256 id,
        LibAsset.Asset calldata takeAsset
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
}
