//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interface/INftTransferProxy.sol";
import "./interface/IERC20TransferProxy.sol";
import "./util/Ownable.sol";
import "./util/LibAsset.sol";

contract WaffleExchangeProxyHandler is Ownable {
    mapping (bytes4 => address) proxies;

    event ProxyChanged(bytes4 indexed assetType, address proxy);

    function initTransferProxy(INftTransferProxy transferProxy, IERC20TransferProxy erc20TransferProxy) internal {
        proxies[LibAsset.ERC20_ASSET_CLASS] = address(erc20TransferProxy);
        proxies[LibAsset.ERC721_ASSET_CLASS] = address(transferProxy);
        proxies[LibAsset.ERC1155_ASSET_CLASS] = address(transferProxy);
    }

    function setTransferProxy(bytes4 assetType, address proxy) external onlyOwner {
        proxies[assetType] = proxy;
        emit ProxyChanged(assetType, proxy);
    }
}
