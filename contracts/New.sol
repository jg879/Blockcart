// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract NewContr {
    
    address public owner;

    struct Item{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
    }

    constructor(){
        owner = msg.sender;
    }

    mapping(uint256 => Item) public itemsMap;

    event Product(string name, uint256 cost);

    function product(uint256 _id, string memory _name, string memory _category, string memory _image, uint256 _cost) public{

        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost
        );

        itemsMap[_id] = item;

        emit Product(_name, _cost);
    }

}
