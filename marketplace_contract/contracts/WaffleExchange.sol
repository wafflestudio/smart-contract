//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./util/LibAsset.sol";
import "./util/LibOrder.sol";
import "./interface/INftTransferProxy.sol";
import "./interface/IERC20TransferProxy.sol";
import "./interface/IWaffleExchange.sol";
import "./WaffleExchangeProxyHandler.sol";

contract WaffleExchange is WaffleExchangeProxyHandler, IWaffleExchange {
    /**
     * @dev 거래 수수료
     */
    uint8 private exchangeFee;

    constructor(
        INftTransferProxy nftTransferProxy,
        IERC20TransferProxy erc20TransferProxy,
        uint8 _exchangeFee
    ) {
        initTransferProxy(nftTransferProxy, erc20TransferProxy);
        exchangeFee = _exchangeFee;
    }

    function registerOrder(
        address maker,
        LibAsset.Asset calldata makerAsset,
        LibAsset.Asset calldata takerAsset
    ) external returns (uint256) {
        uint256 id = _getRandom(makerAsset.assetType.data);
        orders.push(
            LibOrder.Order(
                maker,
                makerAsset,
                address(0),
                takerAsset,
                id,
                LibOrder.OrderStatus.onSale
            )
        );
        return id;
    }

    function matchOrder(
        address taker,
        uint256 id,
        LibAsset.Asset calldata takerAsset
    ) external returns (bool) {
        LibOrder.Order order = orderOf(id);
        _validateOrder(order, taker, takerAsset);
        _matchAndTransfer(order, taker, takerAsset);
        order.taker = taker;
        order.status = LibOrder.OrderStatus.completed;
        return true;
    }

    function cancelOrder(address maker, uint256 id) external returns (bool) {
        LibOrder.Order order = orderOf(id);
        require(order.maker == maker == msg.sender());
        require(order.status == LibOrder.OrderStatus.onSale);
        order.status = LibOrder.OrderStatus.completed;
        return true;
    }

    function _validateOrder(
        LibOrder.Order memory order,
        address taker,
        LibAsset.Asset takerAsset
    ) internal {
        require(order.taker == 0x0);
        require(order.status == LibOrder.OrderStatus.onSale);
        require(order.takeAsset == takerAsset);
        // require : does taker have enough balance?
    }

    function _matchAndTransfer(
        LibOrder.Order memory order,
        address taker,
        LibAsset.Asset takerAsset
    ) internal {
        // maker -> taker (100% of order.makerAsset)
        // proxies[].transfer()
        // taker -> maker (96.7% of order.takerAsset)
        // proxies[].transfer()
    }

    function _getRandom(bytes memory data) internal view returns (uint256) {
        return
            uint256(keccak256(abi.encode(block.timestamp, msg.sender, data)));
    }
}
