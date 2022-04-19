pragma solidity ^0.7.0;

contract Payment{
    mapping(address => uint256) private balance;


     function makepayment(uint256 amount,address payable company) external payable  {
        address payable client = company;
        require(balance[msg.sender] >= amount);
        client.transfer(amount);
        balance[msg.sender] = balance[msg.sender] - amount;
    }
}