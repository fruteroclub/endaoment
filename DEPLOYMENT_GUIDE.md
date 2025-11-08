# 🚀 Endaoment Protocol - Deployment Guide

This guide walks you through deploying the Endaoment Protocol to Base Sepolia (or any EVM-compatible network).

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Deployment Process](#deployment-process)
4. [Post-Deployment Tasks](#post-deployment-tasks)
5. [Verification](#verification)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Tools
- Node.js v18+ and Yarn
- MetaMask or another Web3 wallet
- Base Sepolia ETH for gas fees
- (Optional) BaseScan API key for contract verification

### Get Test ETH
Before deploying, get Base Sepolia ETH from:
- **Coinbase Faucet**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **QuickNode Faucet**: https://faucet.quicknode.com/base/sepolia

You'll need approximately **0.05 ETH** for gas fees to deploy all contracts.

---

## Environment Setup

### 1. Configure Environment Variables

Create a `.env` file in the project root (or `packages/hardhat/.env`):

```bash
# Required: Your deployer wallet private key
__RUNTIME_DEPLOYER_PRIVATE_KEY=your_private_key_here_without_0x

# Optional: BaseScan API key for contract verification
ETHERSCAN_V2_API_KEY=your_basescan_api_key

# Optional: Alchemy API key for better RPC performance
ALCHEMY_API_KEY=your_alchemy_api_key
```

> ⚠️ **Security Warning**: Never commit your `.env` file! It should already be in `.gitignore`.

### 2. Get Your Private Key

**From MetaMask**:
1. Open MetaMask
2. Click the three dots → Account Details → Export Private Key
3. Enter your password
4. Copy the private key (without the `0x` prefix)

> 💡 **Best Practice**: Use a dedicated deployment wallet, not your main wallet.

### 3. Get BaseScan API Key (Optional but Recommended)

For contract verification:
1. Go to https://basescan.org/
2. Sign up for an account
3. Go to API Keys → Create New API Key
4. Copy the key to your `.env` file

---

## Deployment Process

### Step 1: Install Dependencies

```bash
# From project root
yarn install
```

### Step 2: Compile Contracts

```bash
cd packages/hardhat
yarn compile
```

Expected output:
```
✅ Compiled 15 Solidity files successfully
```

### Step 3: Deploy to Base Sepolia

```bash
# Deploy all contracts in correct order
yarn deploy:baseSepolia
```

This will automatically:
1. ✅ Deploy **MockUSDC** (test USDC token)
2. ✅ Deploy **StudentRegistry** and register 8 test students
3. ✅ Deploy **AllocationManager** and link to StudentRegistry
4. ✅ Deploy **EndaomentVault** and register with AllocationManager
5. ✅ Generate deployment documentation in `docs/deployments/`

**Expected Output:**
```
👋 MockUSDC deployed to: 0x1234...
💰 Deployer initial balance: 10000000 USDC

👩‍🎓 StudentRegistry deployed to: 0x5678...
📝 Adding test students...
  ✅ Added: Alice Chen (MIT)
  ✅ Added: Bob Martinez (Stanford University)
  ... (6 more students)
🎓 Total students registered: 8

📊 AllocationManager deployed to: 0x9abc...
🔗 Configuring StudentRegistry...
✅ StudentRegistry configured with AllocationManager address

🏦 EndaomentVault deployed to: 0xdef0...
🔑 Transferring vault ownership to AllocationManager...
✅ Vault ownership transferred
📋 Registering vault with AllocationManager...
✅ Vault registered
🪙 Granting vault minting permission for yield simulation...
✅ Vault can now mint USDC for yield simulation

📄 Generating deployment documentation...
✅ Deployment documentation generated at: docs/deployments/README.md
✅ Address JSON generated at: docs/deployments/baseSepolia-addresses.json
```

### Step 4: Save Contract Addresses

The deployment automatically updates:
- ✅ `packages/nextjs/contracts/deployedContracts.ts` (for frontend)
- ✅ `docs/deployments/README.md` (comprehensive documentation)
- ✅ `docs/deployments/baseSepolia-addresses.json` (JSON format)

---

## Post-Deployment Tasks

### View Deployment Info

```bash
cd packages/hardhat
yarn info:baseSepolia
```

This shows:
- All contract addresses
- Vault configuration
- Epoch information
- Registered students
- Yield split percentages
- Deployer balances

### Mint Test USDC (Optional)

To give test USDC to additional wallets:

1. Edit `packages/hardhat/scripts/mintTestUSDC.ts`
2. Add your wallet addresses to the `recipients` array:

```typescript
const recipients = [
  {
    address: "0xYourWalletAddress",
    amount: ethers.parseUnits("2000", 6), // 2000 USDC for whale
    label: "Whale Wallet"
  },
  {
    address: "0xAnotherWallet",
    amount: ethers.parseUnits("100", 6), // 100 USDC for retail
    label: "Retail Wallet"
  },
];
```

3. Run the script:

```bash
yarn mint:usdc:baseSepolia
```

---

## Verification

### Verify All Contracts on BaseScan

```bash
cd packages/hardhat
yarn verify:baseSepolia
```

This automatically verifies all contracts on https://sepolia.basescan.org/

### Manual Verification (if needed)

If automatic verification fails, verify manually:

```bash
# Get contract addresses from docs/deployments/README.md

# Verify MockUSDC
npx hardhat verify --network baseSepolia <MOCKUSDC_ADDRESS>

# Verify StudentRegistry
npx hardhat verify --network baseSepolia <STUDENTREGISTRY_ADDRESS>

# Verify AllocationManager
npx hardhat verify --network baseSepolia <ALLOCATIONMANAGER_ADDRESS> "<STUDENTREGISTRY_ADDRESS>"

# Verify EndaomentVault
npx hardhat verify --network baseSepolia <VAULT_ADDRESS> \
  "<MOCKUSDC_ADDRESS>" \
  "Endaoment Education Vault" \
  "EDVAULT" \
  "<DEPLOYER_ADDRESS>"
```

### Check Verification Status

Visit your contracts on BaseScan:
```
https://sepolia.basescan.org/address/<CONTRACT_ADDRESS>
```

Look for the green ✅ checkmark next to "Contract" tab.

---

## Testing

### Update Frontend Configuration

1. Edit `packages/nextjs/scaffold.config.ts`:

```typescript
import * as chains from "viem/chains";

const scaffoldConfig = {
  targetNetworks: [chains.baseSepolia], // Changed from chains.hardhat
  onlyLocalBurnerWallet: false, // Changed to allow real wallets
  // ... rest of config
}
```

2. Verify `packages/nextjs/contracts/deployedContracts.ts` has Base Sepolia (chain ID: 84532) addresses.

### Start Frontend

```bash
cd packages/nextjs
yarn start
```

Open http://localhost:3000

### Connect MetaMask

1. Add Base Sepolia network to MetaMask:
   - **Network Name**: Base Sepolia
   - **RPC URL**: https://sepolia.base.org
   - **Chain ID**: 84532
   - **Currency Symbol**: ETH
   - **Block Explorer**: https://sepolia.basescan.org

2. Import your test wallet (with USDC)

### Test User Flows

#### 🐋 Whale Flow
1. Connect wallet with 2000+ USDC
2. Go to "Start" page
3. Click "Create New Vault" (this creates a new vault OR uses existing vault)
4. Deposit 1000+ USDC
5. Go to "Allocate" page
6. Vote for students
7. Wait for epoch to end (or fast-forward time in local testing)
8. Click "Distribute Yield"
9. Verify whale receives 10% commission

#### 💰 Retail Flow
1. Connect wallet with 100+ USDC
2. Go to "Vaults" page
3. Browse available vaults
4. Deposit 10+ USDC
5. Go to "Allocate" page
6. Vote for students
7. After yield distribution, verify 15% yield received

#### 🎓 Student Flow
1. Go to "Students" page
2. View all registered students
3. After distribution, check funding received
4. Verify 75% of yield distributed to students based on votes

---

## Troubleshooting

### "Insufficient funds for gas"
**Problem**: Not enough ETH for deployment gas fees  
**Solution**: Get more Base Sepolia ETH from faucets listed above

### "Contract not found" in frontend
**Problem**: Frontend can't find deployed contracts  
**Solution**: 
- Check that `deployedContracts.ts` was updated with Base Sepolia addresses
- Verify you're connected to Base Sepolia network (Chain ID: 84532)
- Restart the frontend (`yarn start`)

### "Transaction reverted" during deployment
**Problem**: Deployment transaction failed  
**Solution**:
- Check deployer has enough ETH
- Verify previous contracts deployed successfully
- Check `packages/hardhat/deployments/baseSepolia/` for partial deployment
- Try `yarn clean` and redeploy

### Verification fails
**Problem**: Contract verification on BaseScan fails  
**Solution**:
- Get BaseScan API key and add to `.env`
- Wait 1-2 minutes after deployment before verifying
- Try manual verification with exact constructor arguments

### "Network not supported" in frontend
**Problem**: RainbowKit/Wagmi doesn't recognize network  
**Solution**:
- Ensure `scaffold.config.ts` has `chains.baseSepolia`
- Check `onlyLocalBurnerWallet: false`
- Clear browser cache and reconnect wallet

### Deployment hangs or takes too long
**Problem**: RPC provider is slow  
**Solution**:
- Get Alchemy API key for better RPC performance
- Use different RPC endpoint in `hardhat.config.ts`

---

## Quick Reference

### Deployment Commands

```bash
# Deploy to Base Sepolia
yarn deploy:baseSepolia

# View deployment info
yarn info:baseSepolia

# Mint test USDC
yarn mint:usdc:baseSepolia

# Verify contracts
yarn verify:baseSepolia
```

### Network Information

| Property | Value |
|----------|-------|
| **Network** | Base Sepolia |
| **Chain ID** | 84532 |
| **RPC URL** | https://sepolia.base.org |
| **Block Explorer** | https://sepolia.basescan.org |
| **Faucet** | https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet |

### Contract Deployment Order

1. **MockUSDC** - ERC20 test token (no dependencies)
2. **StudentRegistry** - Student management (no dependencies)
3. **AllocationManager** - Vote allocation & yield distribution (requires StudentRegistry)
4. **EndaomentVault** - ERC-4626 vault (requires MockUSDC & AllocationManager)

### File Locations

- **Deployment Docs**: `docs/deployments/README.md`
- **Contract Addresses (JSON)**: `docs/deployments/baseSepolia-addresses.json`
- **Frontend Contract Config**: `packages/nextjs/contracts/deployedContracts.ts`
- **Network Config**: `packages/hardhat/hardhat.config.ts`
- **Frontend Network Config**: `packages/nextjs/scaffold.config.ts`

---

## Support

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review deployment logs in `docs/deployments/README.md`
3. Run `yarn info:baseSepolia` to check current state
4. Check BaseScan explorer for transaction details

---

## Next Steps

After successful deployment:

1. ✅ Test all user flows (whale, retail, student)
2. ✅ Create demo video (see `docs/workflow/epic-5-production-launch.md`)
3. ✅ Deploy frontend to Vercel (optional)
4. ✅ Prepare hackathon submission materials
5. ✅ Add screenshots to README.md

---

*Last Updated: 2024*
*Protocol Version: MVP v1.0*

