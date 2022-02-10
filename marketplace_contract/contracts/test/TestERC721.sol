// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {

    }

    function mint(address to, uint tokenId, string memory uri) external {
        _mint(to, tokenId);
    }

    function burn(uint tokenId) external {
        _burn(tokenId);
    }
}
