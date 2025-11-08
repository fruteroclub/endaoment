# 🚀 Base Mainnet Deployment Guide

## ⚠️ Important Differences from Testnet

### Real USDC on Base Mainnet
- **USDC Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- We'll use the **real USDC contract** instead of MockUSDC
- You'll need **real USDC** to test deposits (not mintable)

### Requirements
- ✅ ETH on Base mainnet (for gas fees)
- ✅ USDC on Base mainnet (for testing deposits)
- ✅ Private key configured in `.env`
- ✅ BaseScan API key for verification (optional)

---

## 📋 Pre-Deployment Checklist

### 1. Verify Your Wallet Has Funds

```bash
# Check your deployer address
cd packages/hardhat
yarn account
```

Make sure you have:
- **~0.1 ETH** on Base mainnet for deployment gas
- **Optional**: Some USDC for testing (1000+ for whale vault)

### 2. Set Environment Variables

Ensure your `.env` file has:
```bash
__RUNTIME_DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
ETHERSCAN_V2_API_KEY=your_basescan_api_key  # Optional for verification
```

---

## 🚀 Deployment Steps

### Step 1: Compile Contracts

```bash
cd packages/hardhat
yarn compile
```

### Step 2: Deploy to Base Mainnet

```bash
yarn deploy:base
```

**What gets deployed:**
1. ✅ **StudentRegistry** - Student management (8 LATAM students pre-registered)
2. ✅ **AllocationManager** - Voting & yield distribution
3. ✅ **EndaomentVault** - ERC-4626 vault (using real USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)

**Note**: We skip MockUSDC on mainnet and use the real USDC contract!

### Step 3: Verify Deployment Info

```bash
yarn info:base
```

This shows:
- All contract addresses
- Vault configuration
- Registered students
- Deployer balances

### Step 4: Verify Contracts on BaseScan

```bash
yarn verify:base
```

This makes your contracts readable and interactive on https://basescan.org/

---

## 📝 Important Notes

### USDC on Base Mainnet

**Real USDC Contract**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

You **cannot** mint USDC on mainnet. To get USDC:
1. **Bridge** from Ethereum mainnet: https://bridge.base.org
2. **Buy** on Base DEXs (Uniswap, Aerodrome)
3. **Bridge** from other chains (Arbitrum, Optimism)

### Gas Costs Estimate

Approximate ETH needed for deployment:
- StudentRegistry: ~0.01 ETH
- AllocationManager: ~0.015 ETH
- EndaomentVault: ~0.02 ETH
- **Total**: ~0.05 ETH + buffer

### Deployment Script Differences

The deployment automatically detects the network:
- **Testnet** (baseSepolia): Deploys MockUSDC
- **Mainnet** (base): Uses real USDC at `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

---

## 🎯 Post-Deployment

### Update Frontend Configuration

Edit `packages/nextjs/scaffold.config.ts`:

```typescript
import { base } from "viem/chains";

const scaffoldConfig = {
  targetNetworks: [base],  // Changed from baseSepolia
  onlyLocalBurnerWallet: false,
  // ... rest
}
```

### Update Contract Addresses

The deployment will automatically update:
- `packages/nextjs/contracts/deployedContracts.ts` (frontend config)
- `docs/deployments/README.md` (documentation)
- `docs/deployments/base-addresses.json` (JSON format)

---

## ✅ Testing on Mainnet

### 1. Get Some USDC

Bridge USDC to Base mainnet or buy on a DEX.

### 2. Test Whale Flow

```bash
# 1. Approve USDC
# Go to USDC contract on BaseScan: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
# Call: approve(vaultAddress, 10000000000) // 10,000 USDC

# 2. Deposit to vault via your frontend or BaseScan
```

### 3. Test Retail Flow

Same as whale but with smaller amounts (10+ USDC).

---

## 🔒 Security Considerations

### Mainnet vs Testnet

| Aspect | Testnet | Mainnet |
|--------|---------|---------|
| USDC | MockUSDC (mintable) | Real USDC (buy/bridge) |
| Gas | Free test ETH | Real ETH ($$$) |
| Yield | Mock (time-based) | Mock (time-based)* |
| Reversibility | Yes | **NO** |

**⚠️ Important**: The yield mechanism is still mock/simulated. For production, integrate real yield protocols (Aave, Compound).

### Before Mainnet Launch

- [ ] **Audit**: Get smart contracts audited
- [ ] **Test**: Extensive testing on testnet
- [ ] **Yield**: Integrate real yield protocol
- [ ] **Admin**: Set up proper admin controls
- [ ] **Monitoring**: Set up contract monitoring
- [ ] **Insurance**: Consider smart contract insurance

---

## 📊 Network Information

| Property | Value |
|----------|-------|
| **Network** | Base Mainnet |
| **Chain ID** | 8453 |
| **RPC URL** | https://mainnet.base.org |
| **Block Explorer** | https://basescan.org |
| **USDC Contract** | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

---

## 🆘 Troubleshooting

### "Insufficient funds for gas"
→ Get more ETH on Base mainnet from Coinbase or bridge

### "USDC approval failed"
→ Make sure you have USDC in your wallet first
→ Check you're on Base mainnet (chain ID: 8453)

### "Deployment reverted"
→ Check deployer has enough ETH
→ Verify previous contracts deployed successfully
→ Check `packages/hardhat/deployments/base/` for state

### "Verification failed"
→ Get BaseScan API key: https://basescan.org/myapikey
→ Add to `.env`: `ETHERSCAN_V2_API_KEY=your_key`
→ Wait 1-2 minutes after deployment before verifying

---

## 📈 Cost Analysis

### One-Time Costs (Deployment)
- Contract deployment: ~0.05 ETH (~$150 at $3000/ETH)
- Verification: Free

### Ongoing Costs
- Vault creation: ~0.005 ETH per vault
- Deposits: ~0.002 ETH per deposit
- Voting: ~0.003 ETH per vote allocation
- Distribution: ~0.01 ETH per distribution (grows with # students)

---

## 🎯 Deployment Commands Reference

```bash
# Deploy to Base mainnet
yarn deploy:base

# View deployment info
yarn info:base

# Verify contracts
yarn verify:base

# Check deployer account
yarn account
```

---

## ⚠️ Critical Reminders

1. **Test First**: Always test on baseSepolia before mainnet
2. **Double Check**: Verify all addresses before transactions
3. **Real Money**: This is real ETH and USDC - be careful!
4. **Audit Needed**: Get contracts audited before public launch
5. **Yield Integration**: Mock yield is NOT production-ready

---

## 📁 Generated Files

After deployment, you'll have:
- `docs/deployments/README.md` - Full deployment documentation
- `docs/deployments/base-addresses.json` - Contract addresses (JSON)
- `packages/nextjs/contracts/deployedContracts.ts` - Frontend config
- `packages/hardhat/deployments/base/` - Hardhat deployment artifacts

---

## 🎉 You're Ready!

Once deployed, your contracts will be live on Base mainnet with real USDC!

**Next Steps:**
1. Deploy contracts: `yarn deploy:base`
2. Verify on BaseScan: `yarn verify:base`
3. Update frontend config
4. Test with small amounts
5. Monitor contract activity

---

**Need Help?** Review the testnet guide first: `DEPLOYMENT_GUIDE.md`

**Status**: Ready for Base Mainnet Deployment 🚀

