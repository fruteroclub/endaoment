import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";
import * as fs from "fs";
import * as path from "path";

/**
 * Generates deployment documentation after all contracts are deployed
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const generateDeploymentDocs: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const networkName = hre.network.name;

  console.log("\n📄 Generating deployment documentation...");

  try {
    // Get all deployed contracts
    const mockUSDC = await hre.ethers.getContract<Contract>("MockUSDC", deployer);
    const studentRegistry = await hre.ethers.getContract<Contract>("StudentRegistry", deployer);
    const allocationManager = await hre.ethers.getContract<Contract>("AllocationManager", deployer);
    const vault = await hre.ethers.getContract<Contract>("EndaomentVault", deployer);

    // Get addresses
    const addresses = {
      mockUSDC: await mockUSDC.getAddress(),
      studentRegistry: await studentRegistry.getAddress(),
      allocationManager: await allocationManager.getAddress(),
      vault: await vault.getAddress(),
    };

    // Get vault info
    const vaultName = await vault.name();
    const vaultSymbol = await vault.symbol();
    const whale = await vault.whale();
    const asset = await vault.asset();
    const vaultOwner = await vault.owner();

    // Get allocation manager info
    const currentEpoch = await allocationManager.getCurrentEpoch();
    const epochDuration = await allocationManager.EPOCH_DURATION();
    const whaleShare = await allocationManager.WHALE_SHARE_BPS();
    const retailShare = await allocationManager.RETAIL_SHARE_BPS();
    const studentShare = await allocationManager.STUDENT_SHARE_BPS();

    // Get student count
    const studentCount = await studentRegistry.getStudentCount();

    // Get deployer balance
    const deployerBalance = await mockUSDC.balanceOf(deployer);

    // Determine block explorer base URL
    let explorerUrl = "https://etherscan.io";
    if (networkName.includes("baseSepolia")) {
      explorerUrl = "https://sepolia.basescan.org";
    } else if (networkName.includes("base") && !networkName.includes("Sepolia")) {
      explorerUrl = "https://basescan.org";
    } else if (networkName.includes("sepolia")) {
      explorerUrl = "https://sepolia.etherscan.io";
    } else if (networkName === "localhost" || networkName === "hardhat") {
      explorerUrl = "http://localhost:8545";
    }

    // Get network ID
    const chainId = await hre.ethers.provider.getNetwork().then(n => n.chainId);

    // Generate README content
    const readmeContent = `# Endaoment Protocol - Deployment Information

## Network: ${networkName} (Chain ID: ${chainId})

**Deployment Date**: ${new Date().toISOString()}  
**Deployer Address**: \`${deployer}\`  
**Block Explorer**: ${explorerUrl}

---

## 📋 Contract Addresses

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| **MockUSDC** | \`${addresses.mockUSDC}\` | [View on Explorer](${explorerUrl}/address/${addresses.mockUSDC}) |
| **StudentRegistry** | \`${addresses.studentRegistry}\` | [View on Explorer](${explorerUrl}/address/${addresses.studentRegistry}) |
| **AllocationManager** | \`${addresses.allocationManager}\` | [View on Explorer](${explorerUrl}/address/${addresses.allocationManager}) |
| **EndaomentVault** | \`${addresses.vault}\` | [View on Explorer](${explorerUrl}/address/${addresses.vault}) |

---

## 🏦 Vault Configuration

| Property | Value |
|----------|-------|
| **Name** | ${vaultName} |
| **Symbol** | ${vaultSymbol} |
| **Underlying Asset** | \`${asset}\` (MockUSDC) |
| **Whale Address** | \`${whale}\` |
| **Owner (AllocationManager)** | \`${vaultOwner}\` |
| **Current Total Assets** | Starts at 0 USDC |
| **APY** | 5% (simulated) |

---

## 📊 Allocation Manager Configuration

### Epoch Settings
- **Current Epoch ID**: ${currentEpoch.id}
- **Epoch Duration**: ${Number(epochDuration)} seconds (${Number(epochDuration) / 86400} days)
- **Epoch Start**: ${new Date(Number(currentEpoch.startTime) * 1000).toUTCString()}
- **Epoch End**: ${new Date(Number(currentEpoch.endTime) * 1000).toUTCString()}

### Yield Split (Basis Points)
| Recipient | Share | Percentage |
|-----------|-------|------------|
| **Whale** | ${whaleShare} bps | ${Number(whaleShare) / 100}% |
| **Retail Contributors** | ${retailShare} bps | ${Number(retailShare) / 100}% |
| **Students** | ${studentShare} bps | ${Number(studentShare) / 100}% |

---

## 👩‍🎓 Student Registry

- **Total Registered Students**: ${studentCount}
- **AllocationManager Set**: ✅ \`${await studentRegistry.allocationManager()}\`

### Registered Students

${await formatStudentList(studentRegistry)}

---

## 💰 Initial Balances

- **Deployer USDC Balance**: ${hre.ethers.formatUnits(deployerBalance, 6)} USDC
- **Vault Total Assets**: 0 USDC (no deposits yet)

---

## 🚀 Quick Start for Testing

### 1. Get Test USDC (if on testnet)
\`\`\`bash
# The deployer already has ${hre.ethers.formatUnits(deployerBalance, 6)} USDC
# To mint more USDC to your test wallet:
npx hardhat run scripts/mintTestUSDC.ts --network ${networkName}
\`\`\`

### 2. Approve USDC for Vault
\`\`\`solidity
MockUSDC.approve(${addresses.vault}, amount)
\`\`\`

### 3. Deposit to Vault (Whale: 1000+ USDC, Retail: 10+ USDC)
\`\`\`solidity
EndaomentVault.deposit(amount, recipient)
\`\`\`

### 4. Allocate Votes to Students
\`\`\`solidity
AllocationManager.allocateVotes(vaultAddress, studentAddresses[], voteAmounts[])
\`\`\`

### 5. Distribute Yield (after epoch ends)
\`\`\`solidity
AllocationManager.distributeYield(vaultAddress)
\`\`\`

---

## 🔧 Contract Interaction Examples

### Check Your Vault Shares
\`\`\`javascript
const shares = await vault.balanceOf(yourAddress);
console.log(\`You have \${shares} shares\`);
\`\`\`

### Check Vault Total Assets
\`\`\`javascript
const totalAssets = await vault.totalAssets();
console.log(\`Vault has \${ethers.formatUnits(totalAssets, 6)} USDC\`);
\`\`\`

### Check Your Vote Allocation
\`\`\`javascript
const allocation = await allocationManager.getUserAllocation(vaultAddress, yourAddress);
console.log(\`You allocated \${allocation.totalVotes} votes across \${allocation.students.length} students\`);
\`\`\`

### View Student Funding Received
\`\`\`javascript
const funding = await allocationManager.getStudentTotalFunding(studentAddress);
console.log(\`Student received \${ethers.formatUnits(funding, 6)} USDC total\`);
\`\`\`

---

## ⚠️ Important Notes

### For ${networkName === "baseSepolia" ? "Base Sepolia Testnet" : networkName === "localhost" ? "Local Development" : "Production"}

${
  networkName === "baseSepolia"
    ? `
- **Get Test ETH**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Network**: Base Sepolia
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Block Explorer**: https://sepolia.basescan.org
`
    : networkName === "localhost"
      ? `
- **Local Network**: Running on localhost:8545
- **Accounts**: Use Hardhat test accounts
- **Reset**: Run \`yarn chain\` to restart the local blockchain
`
      : `
- **Production Network**: Ensure all security measures are in place
- **Audit Status**: Contract should be audited before mainnet use
`
}

### Known Limitations (MVP)
- ⚠️ **Mock Yield**: Using time-based USDC minting, not real yield protocols
- ⚠️ **No Withdrawals**: MVP locks deposits (implement ERC-4626 withdraw for production)
- ⚠️ **Single Vault**: Not using factory pattern for multiple vaults
- ⚠️ **Test Students**: Pre-registered students, no self-registration yet
- ⚠️ **Simplified Voting**: Linear vote allocation, not quadratic funding

---

## 📝 Deployment Verification Commands

### Verify all contracts on block explorer:
\`\`\`bash
# Verify MockUSDC
npx hardhat verify --network ${networkName} ${addresses.mockUSDC}

# Verify StudentRegistry
npx hardhat verify --network ${networkName} ${addresses.studentRegistry}

# Verify AllocationManager
npx hardhat verify --network ${networkName} ${addresses.allocationManager} "${addresses.studentRegistry}"

# Verify EndaomentVault
npx hardhat verify --network ${networkName} ${addresses.vault} "${addresses.mockUSDC}" "${vaultName}" "${vaultSymbol}" "${whale}"
\`\`\`

---

## 🧪 Testing Checklist

- [ ] Deployer can mint USDC
- [ ] Whale can deposit 1000+ USDC
- [ ] Retail can deposit 10+ USDC
- [ ] Users can allocate votes to students
- [ ] Yield accrues over time
- [ ] Yield distribution works (10/15/75 split)
- [ ] Students receive allocated funding
- [ ] Whale receives 10% commission
- [ ] Retail contributors receive 15% yield

---

## 📞 Support & Resources

- **GitHub Repository**: [Add your repo URL]
- **Documentation**: [Add docs URL]
- **Demo Video**: [Add video URL]
- **Team Contact**: [Add contact info]

---

*Generated automatically by Endaoment deployment script*  
*Last Updated*: ${new Date().toISOString()}
`;

    // Write to deployments folder
    const docsPath = path.join(__dirname, "../../../docs/deployments");
    if (!fs.existsSync(docsPath)) {
      fs.mkdirSync(docsPath, { recursive: true });
    }

    const readmePath = path.join(docsPath, "README.md");
    fs.writeFileSync(readmePath, readmeContent);

    console.log(`✅ Deployment documentation generated at: ${readmePath}`);
    console.log(`\n📄 View deployment info: docs/deployments/README.md`);

    // Also create a JSON file with just addresses for programmatic access
    const addressesJson = {
      network: networkName,
      chainId: Number(chainId),
      timestamp: new Date().toISOString(),
      deployer,
      contracts: addresses,
      vault: {
        name: vaultName,
        symbol: vaultSymbol,
        whale,
        asset,
        owner: vaultOwner,
      },
      students: Number(studentCount),
    };

    const jsonPath = path.join(docsPath, `${networkName}-addresses.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(addressesJson, null, 2));
    console.log(`✅ Address JSON generated at: ${jsonPath}`);
  } catch (error) {
    console.error("❌ Error generating deployment docs:", error);
    // Don't fail deployment if docs generation fails
  }
};

// Helper function to format student list
async function formatStudentList(registry: Contract): Promise<string> {
  const students: string[] = [];

  try {
    // Get all student addresses first
    const studentAddresses = await registry.getAllStudents();

    // Fetch details for each student
    for (let i = 0; i < studentAddresses.length; i++) {
      try {
        const studentAddr = studentAddresses[i];
        const student = await registry.getStudent(studentAddr);
        students.push(
          `${i + 1}. **${student.name}** - ${student.university}\n   - Research: ${student.researchArea}\n   - Address: \`${studentAddr}\`\n   - Funding Received: 0 USDC`,
        );
      } catch (error) {
        console.error(`Error fetching student ${i}:`, error);
      }
    }
  } catch (error) {
    console.error("Error fetching student list:", error);
  }

  return students.length > 0 ? students.join("\n\n") : "No students registered yet.";
}

export default generateDeploymentDocs;

generateDeploymentDocs.tags = ["DeploymentDocs"];
generateDeploymentDocs.dependencies = ["EndaomentVault"];
generateDeploymentDocs.runAtTheEnd = true;
