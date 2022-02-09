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
    event Transferred(LibAsset.Asset memory asset, address from, address to);

    function initTransferProxy(INftTransferProxy transferProxy, IERC20TransferProxy erc20TransferProxy) internal {
        proxies[LibAsset.ERC20_ASSET_CLASS] = address(erc20TransferProxy);
        proxies[LibAsset.ERC721_ASSET_CLASS] = address(transferProxy);
        proxies[LibAsset.ERC1155_ASSET_CLASS] = address(transferProxy);
    }

    function setTransferProxy(bytes4 assetType, address proxy) external onlyOwner {
        proxies[assetType] = proxy;
        emit ProxyChanged(assetType, proxy);
    }

    function transfer(
        LibAsset.Asset memory asset,
        address from,
        address to
    ) internal {
        if (asset.assetType.assetClass == LibAsset.ERC20_ASSET_CLASS) {
            (address token) = abi.decode(asset.assetType.data, (address));
            IERC20TransferProxy(proxies[LibAsset.ERC20_ASSET_CLASS]).erc20safeTransferFrom(IERC20(token), from, to, asset.value);
        } else if (asset.assetType.assetClass == LibAsset.ERC721_ASSET_CLASS) {
            (address token, uint tokenId) = abi.decode(asset.assetType.data, (address, uint256));
            require(asset.value == 1, "erc721 value error");
            INftTransferProxy(proxies[LibAsset.ERC721_ASSET_CLASS]).erc721safeTransferFrom(IERC721(token), from, to, tokenId);
        } else if (asset.assetType.assetClass == LibAsset.ERC1155_ASSET_CLASS) {
            (address token, uint tokenId) = abi.decode(asset.assetType.data, (address, uint256));
            INftTransferProxy(proxies[LibAsset.ERC1155_ASSET_CLASS]).erc1155safeTransferFrom(IERC1155(token), from, to, tokenId, asset.value, "");
        }
        emit Transferred(asset, from, to);
    }
}
