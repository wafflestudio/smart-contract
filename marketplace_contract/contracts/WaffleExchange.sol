//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./util/LibAsset.sol";
import "./util/LibOrder.sol";
import "./interface/INftTransferProxy.sol";
import "./interface/IERC20TransferProxy.sol";
import "./interface/IWaffleExchange.sol";
import "./WaffleExchangeProxyHandler.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WaffleExchange is WaffleExchangeProxyHandler, IWaffleExchange {
    /**
     * @dev 거래 수수료
     */
    uint8 private exchangeFeeDenominator;

    using Counters for Counters.Counter;
    Counters.Counter private _latestOrderId;

    event OrderRegistered(address indexed maker, LibAsset.Asset makeAsset, LibAsset.Asset takeAsset, uint256 id);
    constructor(
        INftTransferProxy nftTransferProxy,
        IERC20TransferProxy erc20TransferProxy,
        uint8 _exchangeFeeDenominator
    ) {
        initTransferProxy(nftTransferProxy, erc20TransferProxy);
        exchangeFeeDenominator = _exchangeFeeDenominator;
    }

    function registerOrder(
        address maker,
        LibAsset.Asset calldata makeAsset,
        LibAsset.Asset calldata takeAsset
    ) external virtual override returns (uint256) {
        require(
            _getBalance(maker, makeAsset) >= makeAsset.value,
            "maker should have enough asset"
        );
        
        _latestOrderId.increment();
        uint256 id = _latestOrderId.current();

        {
            LibOrder.Order memory newOrder = LibOrder.Order(
                    maker,
                    makeAsset,
                    address(0),
                    takeAsset,
                    id,
                    LibOrder.OrderStatus.onSale
                );

            orders.push(newOrder);
            orderOf[id] = newOrder;
            orderByMaker[maker] = newOrder;
        }

        emit OrderRegistered(maker, makeAsset, takeAsset, id);
        return id;
    }

    function matchOrder(
        address taker,
        uint256 id,
        LibAsset.Asset calldata takeAsset
    ) external virtual override returns (bool) {
        LibOrder.Order memory order = orderOf[id];
        _validateOrder(order, taker, takeAsset);
        order.taker = taker;
        order.status = LibOrder.OrderStatus.completed;
        _matchAndTransfer(order);
        return true;
    }

    function cancelOrder(address maker, uint256 id)
        external
        virtual
        override
        returns (bool)
    {
        LibOrder.Order memory order = orderOf[id];
        require(
            order.maker == msg.sender,
            "message sender should be maker of the order"
        );
        require(order.maker == maker, "maker of the order should match maker");
        require(
            order.status == LibOrder.OrderStatus.onSale,
            "the order should be on sale"
        );
        order.status = LibOrder.OrderStatus.completed;
        return true;
    }

    function _validateOrder(
        LibOrder.Order memory order,
        address taker,
        LibAsset.Asset memory takeAsset
    ) internal {
        require(
            order.taker == address(0),
            "taker of the order should be blank"
        );
        require(
            order.status == LibOrder.OrderStatus.onSale,
            "the order should be on sale"
        );
        require(
            order.takeAsset.value == takeAsset.value,
            "takeAsset should match"
        );
        require(
            order.takeAsset.assetType.assetClass ==
                takeAsset.assetType.assetClass
        );
        require(
            keccak256(abi.encodePacked(order.takeAsset.assetType.data)) ==
                keccak256(abi.encodePacked(takeAsset.assetType.data)),
            "takeAsset should match"
        );
        require(
            _getBalance(taker, takeAsset) >= takeAsset.value,
            "taker should have enough asset"
        );
        require(
            _getBalance(order.maker, order.makeAsset) >=
                order.makeAsset.value,
            "maker should have enough asset"
        );
    }

    function _matchAndTransfer(LibOrder.Order memory order)
        internal
    {
        // maker -> taker
        transfer(order.makeAsset, order.maker, order.taker);
        // taker -> maker
        LibAsset.Asset memory makerReceivingAsset = LibAsset.Asset(
            order.takeAsset.assetType,
            order.takeAsset.value -
                (order.takeAsset.value / exchangeFeeDenominator)
        );
        transfer(makerReceivingAsset, order.taker, order.maker);
    }

    function _getBalance(address account, LibAsset.Asset memory asset)
        internal
        returns (uint256)
    {
        if (asset.assetType.assetClass == LibAsset.ERC20_ASSET_CLASS) {
            address token = abi.decode(asset.assetType.data, (address));
            return IERC20(token).balanceOf(account);
        } else if (asset.assetType.assetClass == LibAsset.ERC721_ASSET_CLASS) {
            (address token, ) = abi.decode(
                asset.assetType.data,
                (address, uint256)
            );
            require(asset.value == 1, "erc721 value error");
            return IERC721(token).balanceOf(account);
        } else if (asset.assetType.assetClass == LibAsset.ERC1155_ASSET_CLASS) {
            (address token, uint256 tokenId) = abi.decode(
                asset.assetType.data,
                (address, uint256)
            );
            return IERC1155(token).balanceOf(account, tokenId);
        }
        return 0;
    }

    function getExchangeFee() external view returns (uint8) {
        return exchangeFeeDenominator;
    }

    function getOrders() external view returns (LibOrder.Order[] memory) {
        return orders;
    }
}
