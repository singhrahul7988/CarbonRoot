// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ICarbonCredit {
    function marketplaceTransfer(address from, address to, uint256 projectId, uint256 amount) external;
}

contract Marketplace is Ownable {
    uint256 public constant PLATFORM_FEE_BPS = 250;
    uint256 public constant BPS_DENOMINATOR = 10_000;

    ICarbonCredit public immutable carbonCredit;
    IERC20 public immutable settlementToken;
    address public treasury;

    struct Listing {
        address developer;
        uint256 unitPrice;
        bool active;
    }

    mapping(uint256 => Listing) public listings;

    event ListingConfigured(uint256 indexed projectId, address indexed developer, uint256 unitPrice);
    event CreditsPurchased(
        uint256 indexed projectId,
        address indexed buyer,
        address indexed developer,
        uint256 amount,
        uint256 grossAmount,
        uint256 platformFee
    );

    constructor(address carbonCreditAddress, address settlementTokenAddress, address treasuryAddress) {
        carbonCredit = ICarbonCredit(carbonCreditAddress);
        settlementToken = IERC20(settlementTokenAddress);
        treasury = treasuryAddress;
    }

    function setTreasury(address treasuryAddress) external onlyOwner {
        treasury = treasuryAddress;
    }

    function configureListing(uint256 projectId, address developer, uint256 unitPrice) external onlyOwner {
        listings[projectId] = Listing({
            developer: developer,
            unitPrice: unitPrice,
            active: true
        });

        emit ListingConfigured(projectId, developer, unitPrice);
    }

    function purchaseCredits(uint256 projectId, uint256 amount) external {
        Listing memory listing = listings[projectId];
        require(listing.active, "Marketplace: inactive listing");
        require(amount > 0, "Marketplace: amount must be greater than zero");

        uint256 grossAmount = listing.unitPrice * amount;
        uint256 platformFee = (grossAmount * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
        uint256 developerProceeds = grossAmount - platformFee;

        require(
            settlementToken.transferFrom(msg.sender, treasury, platformFee),
            "Marketplace: fee transfer failed"
        );
        require(
            settlementToken.transferFrom(msg.sender, listing.developer, developerProceeds),
            "Marketplace: developer transfer failed"
        );

        carbonCredit.marketplaceTransfer(listing.developer, msg.sender, projectId, amount);

        emit CreditsPurchased(
            projectId,
            msg.sender,
            listing.developer,
            amount,
            grossAmount,
            platformFee
        );
    }
}
