# ⚡ Quick Deploy Reference Card

## 🚀 Deploy in 3 Commands

```bash
# 1. Add your private key to .env
echo "__RUNTIME_DEPLOYER_PRIVATE_KEY=your_key_without_0x" > .env

# 2. Get Base Sepolia ETH (≈0.05 ETH needed)
# https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

# 3. Deploy everything
cd packages/hardhat && yarn deploy:baseSepolia
```

---

## 📋 What Deploys (In Order)

| # | Contract | Purpose | Dependencies |
|---|----------|---------|--------------|
| 1️⃣ | **MockUSDC** | Test USDC token | None |
| 2️⃣ | **StudentRegistry** | 8 test students | None |
| 3️⃣ | **AllocationManager** | Voting & yield | StudentRegistry |
| 4️⃣ | **EndaomentVault** | ERC-4626 vault | MockUSDC + AllocationManager |

**Automatic Setup:**
- ✅ All contracts linked together
- ✅ 8 students pre-registered
- ✅ Vault ownership transferred
- ✅ Documentation generated
- ✅ Frontend config updated

---

## 📄 What Gets Generated

### `docs/deployments/README.md`
Full deployment documentation with:
- Contract addresses + BaseScan links
- Vault configuration
- Epoch settings
- Student list
- Testing instructions

### `docs/deployments/baseSepolia-addresses.json`
```json
{
  "contracts": {
    "mockUSDC": "0x...",
    "studentRegistry": "0x...",
    "allocationManager": "0x...",
    "vault": "0x..."
  }
}
```

---

## 🛠️ Useful Commands

```bash
# View deployment info
yarn info:baseSepolia

# Mint test USDC (edit script first)
yarn mint:usdc:baseSepolia

# Verify contracts on BaseScan
yarn verify:baseSepolia
```

---

## 🌐 Network Info

| Setting | Value |
|---------|-------|
| **Network** | Base Sepolia |
| **Chain ID** | 84532 |
| **RPC** | https://sepolia.base.org |
| **Explorer** | https://sepolia.basescan.org |
| **Faucet** | https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet |

---

## ✅ Post-Deploy Checklist

- [ ] Run `yarn verify:baseSepolia`
- [ ] Check `docs/deployments/README.md` for addresses
- [ ] Edit `scripts/mintTestUSDC.ts` with your wallets
- [ ] Run `yarn mint:usdc:baseSepolia`
- [ ] Update `packages/nextjs/scaffold.config.ts`:
  ```typescript
  targetNetworks: [chains.baseSepolia],
  onlyLocalBurnerWallet: false,
  ```
- [ ] Start frontend: `cd packages/nextjs && yarn start`
- [ ] Test on http://localhost:3000

---

## 🧪 Test Flows

### 🐋 Whale
Deposit 1000+ USDC → Allocate votes → Distribute yield → Receive 10%

### 💰 Retail  
Deposit 10+ USDC → Allocate votes → Receive 15% yield

### 🎓 Students
Receive 75% of yield based on vote allocation

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| Insufficient funds | Get more ETH from faucet |
| Contract not found | Check `deployedContracts.ts` updated |
| Verification failed | Add `ETHERSCAN_V2_API_KEY` to `.env` |
| Network not supported | Update `scaffold.config.ts` |

---

## 📚 Full Documentation

- **Detailed Guide**: `DEPLOYMENT_GUIDE.md`
- **Summary**: `DEPLOYMENT_SUMMARY.md`
- **Generated Docs**: `docs/deployments/README.md` (after deploy)

---

**Ready? Just run:** `yarn deploy:baseSepolia` 🚀

