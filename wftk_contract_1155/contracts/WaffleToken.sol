// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";
import "./Waffle.sol";

// @dev 와플 토큰 민팅을 위한 최종 구현체
contract WaffleToken is ERC1155, Waffle {

    constructor(string memory uri) ERC1155(uri) {
        // TODO D_APP 개발 후 URI 연동
        _setURI("");

        for (uint8 i = 0; i < 5; i++) {
            string memory name = string(abi.encodePacked("waffle NFT #", Strings.toString(i)));
            _mintRandomWaffle(name, "");
        }
    }

    function metadataURI(uint8 tokenId) public view returns (string memory) {
        MetaData memory metadata = idToWaffle[tokenId];

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name" : "', metadata.name,'",',
                            '"flavor" : "', _flavorToString(metadata.flavor),'",',
                            '"horizontals" : "', _intPairTobytes(metadata.horizontals), '",',
                            '"verticals" : "', _intPairTobytes(metadata.verticals), '"}'

                        )
                    )
                )
            )
        );
    }

    // @notice bake a new random waffle with your ETH
    function claimRandomWaffle(
        string memory name,
        bytes memory data
    ) external payable {
//        require(msg.value >= 0.001 ether, "you need 0.0001 ETH to purchase waffle");

        _mintRandomWaffle(name, data);

//        payable(owner()).transfer(0.001 ether);
    }

    function _mintRandomWaffle(
        string memory name,
        bytes memory data
    ) internal {
        uint8 tokenId = _createNewRandomNotTaken(name);
        _mint(msg.sender, tokenId, 1, data);
    }
}
