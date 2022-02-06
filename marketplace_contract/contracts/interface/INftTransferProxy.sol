// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./token/IERC721.sol";
import "./token/IERC1155.sol";

interface INftTransferProxy {
    function erc721safeTransferFrom(IERC721 token, address from, address to, uint256 tokenId) external;

    function erc1155safeTransferFrom(IERC1155 token, address from, address to, uint256 id, uint256 value, bytes calldata data) external;
}
