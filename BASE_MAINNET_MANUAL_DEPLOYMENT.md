# 🚀 Base Mainnet Manual Deployment Guide

## Overview

This guide walks you through manually deploying all contracts to **Base mainnet** for the Farcaster Mini App demo.

### Why Base Mainnet?
- ✅ Farcaster Mini Apps **require mainnet** (don't support testnets)
- ✅ We use **MockUSDC** (not real USDC) to keep costs low and enable easy testing
- ✅ Total deployment cost: ~0.05-0.1 ETH (~$150-300)

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables

Ensure your `.env` file in `packages/hardhat` has:

```bash
__RUNTIME_DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
ETHERSCAN_V2_API_KEY=your_basescan_api_key  # Optional for verification
```

### 2. Verify Your Deployer Account

```bash
cd packages/hardhat
yarn account
```

This shows:
- Your deployer address
- Your ETH balance

**Required:** At least **0.1 ETH** on Base mainnet

### 3. Get Base ETH

If you need ETH on Base:
- **Bridge from Ethereum**: https://bridge.base.org
- **Buy on Coinbase**: Withdraw directly to Base
- **Use a DEX**: Buy on Base directly

---

## 🚀 Deployment Steps

### Step 1: Compile Contracts

```bash
cd packages/hardhat
yarn compile
```

Expected output:
```
✓ Compiled 30 Solidity files successfully
```

### Step 2: Deploy to Base Mainnet

```bash
yarn deploy:base
```

**What gets deployed** (in order):
1. ✅ **MockUSDC** - Test USDC token (with mint function for demos)
2. ✅ **StudentRegistry** - Student management (8 LATAM students pre-registered)
3. ✅ **AllocationManager** - Voting & yield distribution logic
4. ✅ **EndaomentVault** - ERC-4626 vault for deposits

**Deployment time:** ~3-5 minutes

**Expected output:**
```
💵 Deploying MockUSDC on base...
deploying "MockUSDC" (tx: 0x...)
✅ MockUSDC deployed at: 0x...

🎓 Deploying StudentRegistry...
deploying "StudentRegistry" (tx: 0x...)
✅ StudentRegistry deployed at: 0x...
📝 Registering 8 students...

⚙️ Deploying AllocationManager...
deploying "AllocationManager" (tx: 0x...)
✅ AllocationManager deployed at: 0x...

🏦 Deploying EndaomentVault...
deploying "EndaomentVault" (tx: 0x...)
✅ EndaomentVault deployed at: 0x...

📚 Generating deployment documentation...
✅ Documentation generated at: docs/deployments/README.md
```

### Step 3: Verify Deployment

```bash
yarn info:base
```

This displays:
- All contract addresses
- Network configuration
- Registered students
- Your balances

**Sample output:**
```
🌐 Network: base (8453)
📍 Deployer: 0x...

📋 Deployed Contracts:
├─ MockUSDC: 0x...
├─ StudentRegistry: 0x...
├─ AllocationManager: 0x...
└─ EndaomentVault: 0x...

👥 Registered Students: 8
   - Ana Silva (Universidade de São Paulo) - 0x...
   - Carlos Rodriguez (Universidad Nacional Autónoma de México) - 0x...
   ...
```

### Step 4: Verify Contracts on BaseScan (Optional)

```bash
yarn verify:base
```

This makes your contracts:
- ✅ Readable on BaseScan
- ✅ Interactive (read/write functions)
- ✅ More trustworthy for users

**Note:** Wait 1-2 minutes after deployment before verifying.

---

## 🧪 Post-Deployment Testing

### 1. Mint Test USDC

Mint some USDC to your wallet for testing:

```bash
yarn mint:usdc:base
```

This mints **5000 USDC** to your deployer address.

To mint to other addresses, edit `packages/hardhat/scripts/mintTestUSDC.ts`.

### 2. Test on BaseScan

Visit your contracts on BaseScan:
```
https://basescan.org/address/YOUR_VAULT_ADDRESS
```

Try:
- ✅ Read functions (name, symbol, totalAssets)
- ✅ Write functions (approve, deposit, mint)

### 3. Update Frontend Config

The deployment automatically updates:
- `packages/nextjs/contracts/deployedContracts.ts`

But verify the network configuration in `packages/nextjs/scaffold.config.ts`:

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.base, chains.baseSepolia], // Base first
  onlyLocalBurnerWallet: false, // Allow real wallets
  // ...
}
```

### 4. Start Frontend

```bash
cd packages/nextjs
yarn start
```

Then visit http://localhost:3000 and:
- Connect your wallet
- Switch to Base mainnet (chain ID: 8453)
- Test creating a vault
- Test depositing USDC

---

## 📊 Deployment Costs (Estimated)

| Contract | Gas Used | Cost (ETH) | Cost (USD @ $3000/ETH) |
|----------|----------|------------|------------------------|
| MockUSDC | ~700k | ~0.015 | ~$45 |
| StudentRegistry | ~1.5M | ~0.025 | ~$75 |
| AllocationManager | ~1.2M | ~0.020 | ~$60 |
| EndaomentVault | ~800k | ~0.015 | ~$45 |
| **Total** | ~4.2M | **~0.075** | **~$225** |

**Note:** Actual costs depend on gas prices. Add 30-50% buffer.

---

## 🎯 Contract Addresses

After deployment, you'll find addresses in:
- **Markdown**: `docs/deployments/README.md`
- **JSON**: `docs/deployments/base-addresses.json`
- **Frontend**: `packages/nextjs/contracts/deployedContracts.ts`

---

## 🔐 Security Notes

### MockUSDC on Mainnet

⚠️ **Important:** We're using MockUSDC on Base mainnet for demo purposes only!

**For Production:**
- Use real USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- Get contracts audited
- Implement proper access controls
- Add emergency pause functionality

### Access Control

Current setup:
- **AllocationManager** owns the vault
- **Deployer** owns AllocationManager
- **Students** are pre-registered

**Before production:**
- [ ] Transfer ownership to a multisig
- [ ] Implement timelock for admin functions
- [ ] Set up monitoring/alerts

---

## 🆘 Troubleshooting

### "Insufficient funds for gas"
```bash
# Check your balance
yarn account
```
→ Need more ETH on Base? Bridge from Ethereum or buy on Coinbase

### "Nonce too high" or "Replacement transaction underpriced"
```bash
# Clear stuck transactions by resetting nonce
# Or wait for pending transaction to complete
```

### "Contract already deployed"
```bash
# If you need to redeploy, remove deployment artifacts:
rm -rf packages/hardhat/deployments/base/
# Then deploy again
yarn deploy:base
```

### "Verification failed"
```bash
# Make sure you have BaseScan API key in .env
ETHERSCAN_V2_API_KEY=your_key

# Wait 1-2 minutes after deployment, then try again
yarn verify:base
```

### "Cannot find module '@openzeppelin/contracts'"
```bash
# Reinstall dependencies
cd packages/hardhat
yarn install
```

---

## 📁 Generated Files

After successful deployment:

```
docs/deployments/
├── README.md                  # Full deployment documentation
└── base-addresses.json        # Contract addresses (JSON)

packages/hardhat/deployments/base/
├── MockUSDC.json
├── StudentRegistry.json
├── AllocationManager.json
├── EndaomentVault.json
└── .chainId

packages/nextjs/contracts/
└── deployedContracts.ts       # Frontend configuration
```

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] All 4 contracts deployed successfully
- [ ] Contracts verified on BaseScan
- [ ] Documentation generated in `docs/deployments/`
- [ ] Frontend config updated
- [ ] Can mint MockUSDC
- [ ] Can create vaults via frontend
- [ ] Students are registered
- [ ] Farcaster Mini App manifest accessible

---

## 📝 Quick Command Reference

```bash
# Check deployer account
yarn account

# Compile contracts
yarn compile

# Deploy to Base mainnet
yarn deploy:base

# View deployment info
yarn info:base

# Verify on BaseScan
yarn verify:base

# Mint test USDC
yarn mint:usdc:base

# Show USDC info
yarn usdc:info:base
```

---

## 🌐 Network Information

| Property | Value |
|----------|-------|
| **Network** | Base Mainnet |
| **Chain ID** | 8453 |
| **RPC URL** | https://mainnet.base.org |
| **Block Explorer** | https://basescan.org |
| **Native Token** | ETH |
| **Currency Symbol** | ETH |

---

## ⚠️ Important Reminders

1. **This is mainnet** - Real ETH, real gas costs, irreversible transactions
2. **MockUSDC is for demo** - Not suitable for production with real funds
3. **Test first** - Try on baseSepolia before mainnet if unsure
4. **Backup your keys** - Store private keys securely
5. **Monitor gas** - Base gas prices are usually low but can spike

---

## 🎯 Next Steps

After deployment:

1. **Test locally**: Create vaults, deposit, vote
2. **Update Farcaster Mini App**: Deploy manifest
3. **Test in Farcaster**: Verify Mini App works
4. **Demo prep**: Mint USDC to demo wallets
5. **Documentation**: Update README with live addresses

---

## 📞 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs in terminal
3. Check BaseScan for transaction details
4. Verify .env configuration
5. Ensure sufficient ETH balance

---

**Status**: Ready for manual deployment to Base mainnet 🚀

**Estimated time**: 10-15 minutes
**Estimated cost**: 0.075-0.1 ETH (~$225-300)

