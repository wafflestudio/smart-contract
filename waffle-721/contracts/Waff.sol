//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HasContractURI {

    string public contractURI;

    constructor(string memory _contractURI) {
        contractURI = _contractURI;
    }

    /**
     * @dev Internal function to set the contract URI
     * @param _contractURI string URI prefix to assign
     * standard: https://docs.opensea.io/docs/contract-level-metadata
     */
    function _setContractURI(string memory _contractURI) internal {
        contractURI = _contractURI;
    }
}

interface HasSecondarySaleFees {

    event SecondarySaleFees(uint256 tokenId, address[] recipients, uint[] bps);

    function getFeeRecipients(uint256 id) external view returns (address payable[] memory);
    function getFeeBps(uint256 id) external view returns (uint[] memory);
}

/**
 * @title Full ERC721 Token with support for tokenURIPrefix
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://eips.ethereum.org/EIPS/eip-721
 */
contract ERC721Base is HasSecondarySaleFees, HasContractURI, ERC721Enumerable {
    struct Fee {
        address payable recipient;
        uint256 value;
    }

    // id => fees
    mapping (uint256 => Fee[]) public fees;

    /**
     * @dev Constructor function
     */
    constructor (string memory _name, string memory _symbol, string memory contractURI, string memory _tokenURIPrefix) HasContractURI(contractURI) ERC721(_name, _symbol) {}

    function getFeeRecipients(uint256 id) external view override returns (address payable[] memory) {
        Fee[] memory _fees = fees[id];
        address payable[] memory result = new address payable[](_fees.length);
        for (uint i = 0; i < _fees.length; i++) {
            result[i] = _fees[i].recipient;
        }
        return result;
    }

    function getFeeBps(uint256 id) external view override returns (uint[] memory) {
        Fee[] memory _fees = fees[id];
        uint[] memory result = new uint[](_fees.length);
        for (uint i = 0; i < _fees.length; i++) {
            result[i] = _fees[i].value;
        }
        return result;
    }

    function _mint(address to, uint256 tokenId, Fee[] memory _fees) internal {
        _mint(to, tokenId);
        address[] memory recipients = new address[](_fees.length);
        uint[] memory bps = new uint[](_fees.length);
        for (uint i = 0; i < _fees.length; i++) {
            require(_fees[i].recipient != address(0x0), "Recipient should be present");
            require(_fees[i].value != 0, "Fee value should be positive");
            fees[tokenId].push(_fees[i]);
            recipients[i] = _fees[i].recipient;
            bps[i] = _fees[i].value;
        }
        if (_fees.length > 0) {
            emit SecondarySaleFees(tokenId, recipients, bps);
        }
    }
}

/**
 * @title ImagedMintableToken
 * @dev anyone can mint token with selected fee.
 */
contract ImagedMintableToken is Ownable, ERC721Burnable, ERC721URIStorage, ERC721Base {

    uint256 tokenCount = 0;

    struct Image {
        uint256 tokenId;
        string uri;
        bytes data;
    }

    mapping(uint256 => Image) public idToImage;

    constructor (string memory contractURI, string memory tokenURIPrefix) ERC721Base("Waffle", "WAFF", contractURI, tokenURIPrefix) {
    }

    function mint(uint256 tokenId, string memory imageUri, bytes memory imageData, Fee[] memory _fees, string memory newTokenURI) public returns (uint256) {
        tokenId = tokenCount;
        tokenCount++;
        idToImage[tokenId] = Image(tokenId, imageUri, imageData);
        _mint(msg.sender, tokenId, _fees);
        _setTokenURI(tokenId, newTokenURI);
        return tokenId;
    }

    function setContractURI(string memory contractURI) public onlyOwner {
        _setContractURI(contractURI);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
    returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
