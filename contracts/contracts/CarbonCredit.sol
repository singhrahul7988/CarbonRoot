// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract CarbonCredit is ERC1155, Ownable {
    address public marketplace;
    address public retirementAgent;

    mapping(uint256 => string) private _projectUris;
    mapping(uint256 => uint256) public phaseOneMinted;
    mapping(uint256 => uint256) public phaseTwoMinted;

    event MarketplaceUpdated(address indexed marketplaceAddress);
    event RetirementAgentUpdated(address indexed retirementAgentAddress);
    event ProjectUriUpdated(uint256 indexed projectId, string projectUri);
    event PhaseOneMinted(uint256 indexed projectId, address indexed developer, uint256 amount);
    event PhaseTwoMinted(uint256 indexed projectId, address indexed developer, uint256 amount);

    constructor() ERC1155("") {}

    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "CarbonCredit: caller is not marketplace");
        _;
    }

    modifier onlyRetirementAgent() {
        require(msg.sender == retirementAgent, "CarbonCredit: caller is not retirement agent");
        _;
    }

    function setMarketplace(address marketplaceAddress) external onlyOwner {
        marketplace = marketplaceAddress;
        emit MarketplaceUpdated(marketplaceAddress);
    }

    function setRetirementAgent(address retirementAgentAddress) external onlyOwner {
        retirementAgent = retirementAgentAddress;
        emit RetirementAgentUpdated(retirementAgentAddress);
    }

    function setProjectUri(uint256 projectId, string calldata projectUri) external onlyOwner {
        _projectUris[projectId] = projectUri;
        emit ProjectUriUpdated(projectId, projectUri);
    }

    function uri(uint256 projectId) public view override returns (string memory) {
        return _projectUris[projectId];
    }

    function mintPhase1(uint256 projectId, uint256 amount, address developerWallet) external onlyOwner {
        _mint(developerWallet, projectId, amount, "");
        phaseOneMinted[projectId] += amount;
        emit PhaseOneMinted(projectId, developerWallet, amount);
    }

    function mintPhase2(uint256 projectId, uint256 amount, address developerWallet) external onlyOwner {
        _mint(developerWallet, projectId, amount, "");
        phaseTwoMinted[projectId] += amount;
        emit PhaseTwoMinted(projectId, developerWallet, amount);
    }

    function marketplaceTransfer(
        address from,
        address to,
        uint256 projectId,
        uint256 amount
    ) external onlyMarketplace {
        _safeTransferFrom(from, to, projectId, amount, "");
    }

    function retireFrom(address account, uint256 projectId, uint256 amount) external onlyRetirementAgent {
        _burn(account, projectId, amount);
    }
}
