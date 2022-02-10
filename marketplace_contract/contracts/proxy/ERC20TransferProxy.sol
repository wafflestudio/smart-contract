pragma solidity ^0.8.0;

import "../interface/IERC20TransferProxy.sol";
import "./Initializable.sol";
import "../roles/OperatorRole.sol";

contract ERC20TransferProxy is IERC20TransferProxy, Initializable, OperatorRole {

    function __ERC20TransferProxy_init() external initializer {
        __Ownable_init();
    }

    function erc20safeTransferFrom(IERC20 token, address from, address to, uint256 value) override external onlyOperator {
        require(token.transferFrom(from, to, value), "failure while transferring");
    }
}
