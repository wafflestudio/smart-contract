// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// @dev 와플 NFT 코어 컨트랙트. 프로퍼티 정의 및 실행 로직 구성
contract Waffle is Ownable {

    enum Flavor { Plain, Chocolate, Vanilla }

    /**
        name: 와플 이름
        flavour: 와플 종류 (rendering 시 색상 등 결정)
        horizontals: 가로 줄 위치
        verticals: 세로 줄 위치
        === verticals & horizontals
        7*7 격자 상에 서로 수직인 평행선 두세트
        - msb => 1~5 (선 긋는 위치)
         가로 * 세로 선 긋는 조합 = 36가지
        - lsb => 색상 16개 (x0 ~xF)
        - (uint8) horizontals[0] = x01 ~ xF5
        서로 겹치거나 인접할 수 없음
        @dev TODO 프로퍼티 확장 및 애플리케이션 형태를 고려한 도메인 설계
    */
    struct MetaData {
        string name;
        Flavor flavor;
        uint8[2] horizontals;
        uint8[2] verticals;
    }

    mapping(uint256 => MetaData) public idToWaffle;
    mapping(uint256 => address) public waffleToOwner;
    mapping(address => uint256) ownerWaffleCount;

    /**
        baseColor, size 결정 로직 (?)
        @dev TODO 새로운 와플 발행, 발행 세부 로직 고도화
    */
    function _createNewWaffle(
        string memory name,
        uint8[2] memory horizontals,
        uint8[2] memory verticals
    ) internal returns (uint) {
        require(_validateShape(horizontals, verticals), 'this shape is not a waffle at all!');

        Flavor flavor = _getRandomFlavour(name);
        uint tokenId = _encodeShape(horizontals, verticals);

        idToWaffle[tokenId] = MetaData(name, flavor, horizontals, verticals);
        waffleToOwner[tokenId] = msg.sender;
        ownerWaffleCount[msg.sender]++;
        return tokenId;
    }

    function _validateShape(
        uint8[2] memory horizontals,
        uint8[2] memory verticals
    ) internal pure returns (bool) {
        if(verticals[0] == 0 || verticals[0] > 5) return false;
        if(verticals[1] == 0 || verticals[1] > 5) return false;
        if(horizontals[0] == 0 || horizontals[0] > 5) return false;
        if(horizontals[1] == 0 || horizontals[1] > 5) return false;
        if(verticals[0] >= verticals[1]) return false;
        if(horizontals[0] >= horizontals[1]) return false;
        uint8 vDistance = verticals[1] - verticals[0];
        uint8 hDistance = horizontals[1] - horizontals[0];
        if(vDistance == 1 || hDistance == 1) return false;
        return true;
    }

    function _encodeShape(
        uint8[2] memory horizontals,
        uint8[2] memory verticals
    ) internal pure returns (uint8) {
        uint8 hor = _encodePair(horizontals[0] - 1, horizontals[1] - 2);
        uint8 ver = _encodePair(verticals[0] - 1, verticals[1] - 2);
        return hor*6 + ver; //return int of range 0 to 35
    }

    function _encodePair(
        uint8 first,
        uint8 second
    ) internal pure returns (uint8) {
        require(first>=0 && first<3, 'line out of range');
        require(second>=1 && second<4, 'line out of range');
        if(first == 0) return second - 1;
        else if(first == 1) return second + 1;
        else return 5;
    }

    function _decodeHor(uint8 tokenId) internal pure returns (uint8[2] memory) {
        require(tokenId>=0 && tokenId<36, 'tokenId out of range');
        return _decodeLoc(tokenId / 6);
    }

    function _decodeVer(uint8 tokenId) internal pure returns (uint8[2] memory) {
        require(tokenId>=0 && tokenId<36, 'tokenId out of range');
        return _decodeLoc(tokenId % 6);
    }

    function _decodeLoc(uint8 code) internal pure returns (uint8[2] memory) {
        require(code>=0 && code<6, 'code out of range');
        if(code <= 2) return [1, code + 3];
        if(code < 5) return [2, code + 1];
        else return [3,5];
    }

    function _getRandomFlavour(string memory name) internal view returns (Flavor) {
        uint8 randomNum = uint8(_getRandom(name) % 3);
        if(randomNum == 0) return Flavor.Plain;
        if(randomNum == 1) return Flavor.Chocolate;
        else return Flavor.Vanilla;
    }

    // @dev pseudo random 함수
    function _getRandom(string memory name) internal view returns(uint256) {
        return uint(keccak256(abi.encode(block.timestamp, msg.sender, name)));
    }

    function showHorizontals(uint8 tokenId) public view returns(uint8[2] memory) {
        return idToWaffle[tokenId].horizontals;
    }

    function showVerticals(uint8 tokenId) public view returns(uint8[2] memory) {
        return idToWaffle[tokenId].verticals;
    }
}
