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
        LibAsset.Asset calldata makerAsset,
        LibAsset.Asset calldata takerAsset
    ) external virtual override returns (uint256) {
        _latestOrderId.increment();
        uint256 id = _latestOrderId.current();
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
    ) external virtual override returns (bool) {
        LibOrder.Order memory order = orderOf[id];
        _validateOrder(order, taker, takerAsset);
        _matchAndTransfer(order, taker);
        order.taker = taker;
        order.status = LibOrder.OrderStatus.completed;
        return true;
    }

    function cancelOrder(address maker, uint256 id)
        external
        virtual
        override
        returns (bool)
    {
        LibOrder.Order memory order = orderOf[id];
        require(order.maker == msg.sender);
        require(order.maker == maker);
        require(order.status == LibOrder.OrderStatus.onSale);
        order.status = LibOrder.OrderStatus.completed;
        return true;
    }

    function _validateOrder(
        LibOrder.Order memory order,
        address taker,
        LibAsset.Asset memory takerAsset
    ) internal {
        require(order.taker == address(0));
        require(order.status == LibOrder.OrderStatus.onSale);
        require(order.takerAsset.value == takerAsset.value);
        require(
            order.takerAsset.assetType.assetClass ==
                takerAsset.assetType.assetClass
        );
        require(
            keccak256(abi.encodePacked(order.takerAsset.assetType.data)) ==
                keccak256(abi.encodePacked(takerAsset.assetType.data))
        );
        require(_getBalance(taker, takerAsset) >= takerAsset.value);
    }

    function _matchAndTransfer(LibOrder.Order memory order, address taker)
        internal
    {
        // maker -> taker
        transfer(order.makerAsset, order.maker, order.taker);
        // taker -> maker
        LibAsset.Asset memory makerReceivingAsset = LibAsset.Asset(
            order.takerAsset.assetType,
            order.takerAsset.value -
                (order.takerAsset.value / exchangeFeeDenominator)
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
            (address token, uint256 tokenId) = abi.decode(
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
}
