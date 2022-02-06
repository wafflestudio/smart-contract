// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

import "../proxy/Initializable.sol";

/**
 부모 컨트랙트 중에 Initializable 컨트랙트 존재하는 경우,
 모든 부모의 initialize 콜을 명시적으로 수행해주어야 한다고 함.

 fixme 이렇게 아무것도 안하는 initialize 함수는 있으나 마나 아닌가?
 */
abstract contract ContextUpgradeable is Initializable {
    function __Context_init() internal initializer {
        __Context_init_unchained();
    }

    function __Context_init_unchained() internal initializer {
    }

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
    uint256[50] private __gap;
}
