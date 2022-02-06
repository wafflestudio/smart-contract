// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "./token/IERC20.sol";

interface IERC20TransferProxy {
    function erc20safeTransferFrom(IERC20 token, address from, address to, uint256 value) external;
}
