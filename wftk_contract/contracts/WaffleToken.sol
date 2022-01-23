// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Waffle.sol";
import "./WaffleOwnership.sol";

// @dev 와플 토큰 민팅을 위한 최종 구현체
contract WaffleToken is WaffleOwnership {

    /** @notice WaffleTokens are first minted for students in waffleStudio (https://wafflestudio.com/)
        @dev 초기에 10개의 토큰을 랜덤 발행해야 하는데, 간단히 진행하기 위해 possible TokenId 0~35 중 3씩 increment 하면서 발행했음
    */
    constructor() ERC721("WaffleToken", "WFTK") {
        // TODO D_APP 개발 후 URI 연동
        setBaseURI("");

        for (uint8 i = 0; i < 10; i++) {
            string memory name = string(abi.encodePacked("waffle NFT #", Strings.toString(i)));
            uint8[2] memory hor = _decodeHor(3*i);
            uint8[2] memory ver = _decodeVer(3*i);
            _mintNewWaffle(name, hor, ver);
        }
    }

    // @dev 새로운 Waffle 토큰 발행
    function _mintNewWaffle(
        string memory name,
        uint8[2] memory horizontals,
        uint8[2] memory verticals
    ) internal {
        uint tokenId = _createNewWaffle(name, horizontals, verticals);
        _safeMint(msg.sender, tokenId);
    }

    // @notice bake a new waffle with your ETH
    function claim(
        string memory name,
        uint8[2] memory horizontals,
        uint8[2] memory verticals
    ) external payable {
        require(msg.value >= 0.00001 ether, "you need 0.00001 ETH to purchase waffle");
        _mintNewWaffle(name, horizontals, verticals);
        payable(owner()).transfer(0.00001 ether);
    }
}
