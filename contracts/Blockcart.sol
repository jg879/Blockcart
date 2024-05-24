// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Blockcart {
    address public owner;
    address public ownerAddress = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;

    struct Item{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
        string description;
    }

    struct Order{
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event List(string name, uint256 cost, uint256 quantity);
    event Buy(address buyer, uint256 orderId, uint256 itemId);

    constructor(){
        owner = msg.sender;
    }

    
    function list(uint256 _id, string memory _name, string memory _category, string memory _image, uint256 _cost, uint256 _rating, uint256 _stock, string memory _description) public {
        
        require(msg.sender == owner);

        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock,
            _description
        );

        items[_id] = item;

        emit List(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable{//payable isliye use kiya taaki jitni bhi ethers mai payment hogi usko smart contract ke andar store kar sake and owner aake withdraw kar sake

        Item memory item = items[_id];

        require(msg.value >= item.cost);
        require(item.stock > 0);

        Order memory order = Order(block.timestamp, item);
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        items[_id].stock = item.stock - 1;

        emit Buy(msg.sender, orderCount[msg.sender], item.id);

    }

    function withdraw() public payable{
        require(msg.sender == owner);
        (bool success, ) = ownerAddress.call{value: address(this).balance}("");
        require(success);
    }

}
