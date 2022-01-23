// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Waffle.sol";

// @dev 와플 컨트랙트의 ERC721 구현체
abstract contract WaffleOwnership is Waffle, ERC721 {

    event UriChanged(string baseURI);

    // @dev TODO D_app
    string private _currentBaseURI;
    function setBaseURI(string memory baseURI) public onlyOwner {
        _currentBaseURI = baseURI;
        emit UriChanged(_currentBaseURI);
    }

    modifier onlyOwnerOf(uint _waffleId) {
        require(msg.sender == waffleToOwner[_waffleId]);
        _;
    }

    mapping (uint => address) waffleApprovals;

    function balanceOf(address _owner) public override view returns (uint256 _balance) {
        return ownerWaffleCount[_owner];
    }

    function ownerOf(uint256 _tokenId) public view override returns (address _owner) {
        return waffleToOwner[_tokenId];
    }

    function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public override onlyOwnerOf(_tokenId) {
        waffleApprovals[_tokenId] = _to;
        emit Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(waffleApprovals[_tokenId] == msg.sender);
        address owner = ownerOf(_tokenId);
        _transfer(owner, msg.sender, _tokenId);
    }

    // @dev ERC721의 approve, transfer 로직을 추상화 => 실제로 Transfer 이벤트를 발생시키는 부분
    function _transfer(address _from, address _to, uint256 _tokenId) internal override {
        ownerWaffleCount[_to]++;
        ownerWaffleCount[_from]--;
        waffleToOwner[_tokenId] = _to;
        emit Transfer(_from, _to, _tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _currentBaseURI;
    }
}