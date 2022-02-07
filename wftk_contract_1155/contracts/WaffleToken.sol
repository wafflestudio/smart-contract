// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "base64-sol/base64.sol";
import "./Waffle.sol";

// @dev 와플 토큰 민팅을 위한 최종 구현체
contract WaffleToken is ERC1155, Waffle {

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
                "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, amount, data);
        waffleToOwner[id] = to;
    }

    function setURI(string memory uri_) public onlyOwner {
        _setURI(uri_);
        for(uint8 i = 0; i<36; i++) {
            if(taken[i]) emit URI(uri_, i);
        }
    }

    constructor(string memory uri) ERC1155(uri) {
        _setURI("");

        for (uint8 i = 0; i < 5; i++) {
            string memory name = string(abi.encodePacked("waffle NFT #", Strings.toString(i)));
            _mintRandomWaffle(name, "");
        }
    }

    function tokenData(uint8 tokenId) public view returns (string memory) {
        MetaData memory metadata = idToWaffle[tokenId];

        return string(
            abi.encodePacked(
                string(
                    abi.encodePacked(
                        '{"name" : "', metadata.name,'",',
                        '"flavor" : "', _flavorToString(metadata.flavor),'",',
                        '"horizontals" : "', _intPairToBytes(metadata.horizontals), '",',
                        '"verticals" : "', _intPairToBytes(metadata.verticals), '",',
                        '"svg" : "',"data:application/json;base64,", Base64.encode(bytes(getSvg(metadata.flavor, metadata.horizontals, metadata.verticals))), '"}'
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
        require(msg.value >= 0.001 ether, "you need 0.0001 ETH to purchase waffle");
        _mintRandomWaffle(name, data);
        payable(owner()).transfer(0.001 ether);
    }

    function _mintRandomWaffle(
        string memory name,
        bytes memory data
    ) internal {
        uint8 tokenId = _createNewRandomNotTaken(name);
        _mint(msg.sender, tokenId, 1, data);
    }
}
