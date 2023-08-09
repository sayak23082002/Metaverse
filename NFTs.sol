//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.9.0;

//Openseppline imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Metaverse is ERC721, Ownable {
    constructor() ERC721 ("META", "MTA") {}

    using Counters for Counters.Counter; //to count

    Counters.Counter private supply; //to count the total supply of NFTs

    uint public maxSupply = 100; //this is the limit of the supply

    uint public cost = 1 ether; //cost for every supply

    struct object{
        string name;
        int w;
        int h;
        int d;
        int x;
        int y;
        int z;
    } //all details object of the NFTs

    mapping (address => object[]) NFTOwners; //this is to map the object array with the address of the sender

    object[] public objects; //this object array will store the total count of NFT objects

    function getObjects() public view returns (object[] memory) {
        return objects; //to return the objects store in the array
    }

    function totalSupply() public view returns (uint) {
        return supply.current(); //the current supply of NFTs
    }

    function mint(string memory _object_name, int _w, int _h, int _d, int _x, int _y, int _z) public payable {
        require(supply.current() <= maxSupply, "Supply limit reached");
        require(msg.value >= cost, "Insufficient Payment");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        object memory _newObject = object(_object_name, _w, _h, _d, _x, _y, _z);
        objects.push(_newObject);
        NFTOwners[msg.sender].push(_newObject);
    }

    function withdrawl() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    function getOwner() public view returns (object[] memory) {
        return NFTOwners[msg.sender];
    }

}