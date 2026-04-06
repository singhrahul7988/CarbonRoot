// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ICarbonCreditRetirement {
    function retireFrom(address account, uint256 projectId, uint256 amount) external;
}

contract RetirementAgent is Ownable {
    ICarbonCreditRetirement public immutable carbonCredit;

    event RetirementEvent(
        address indexed buyer,
        uint256 indexed projectId,
        uint256 amount,
        string purpose,
        uint256 timestamp
    );

    constructor(address carbonCreditAddress) {
        carbonCredit = ICarbonCreditRetirement(carbonCreditAddress);
    }

    function retireCredits(uint256 projectId, uint256 amount, address buyerAddress, string calldata purpose)
        external
    {
        require(amount > 0, "RetirementAgent: amount must be greater than zero");
        require(buyerAddress != address(0), "RetirementAgent: invalid buyer");

        carbonCredit.retireFrom(buyerAddress, projectId, amount);

        emit RetirementEvent(buyerAddress, projectId, amount, purpose, block.timestamp);
    }
}
