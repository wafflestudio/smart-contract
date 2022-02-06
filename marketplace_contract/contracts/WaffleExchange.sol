//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./interface/INftTransferProxy.sol";
import "./interface/IERC20TransferProxy.sol";
import "./WaffleExchangeProxyHandler.sol";

contract WaffleExchange is WaffleExchangeProxyHandler {
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
}
