# 🚀 Quick: Deploy to Base Mainnet

## Prerequisites
- ✅ `.env` configured with private key
- ✅ 0.1 ETH on Base mainnet
- ✅ Deployer account set up

## Deploy (3 commands)

```bash
# 1. Check your account
cd packages/hardhat
yarn account

# 2. Deploy all contracts
yarn deploy:base

# 3. Verify deployment
yarn info:base
```

## Expected Output

```
✅ MockUSDC deployed at: 0x...
✅ StudentRegistry deployed at: 0x...
✅ AllocationManager deployed at: 0x...
✅ EndaomentVault deployed at: 0x...
📚 Documentation generated at: docs/deployments/README.md
```

## Post-Deployment

```bash
# Verify on BaseScan (optional)
yarn verify:base

# Mint test USDC for testing
yarn mint:usdc:base

# Start frontend
cd ../nextjs
yarn start
```

## Contract Addresses

After deployment, find addresses in:
- **Docs**: `docs/deployments/README.md`
- **JSON**: `docs/deployments/base-addresses.json`
- **Frontend**: `packages/nextjs/contracts/deployedContracts.ts`

## Key Info

- **Network**: Base Mainnet (Chain ID: 8453)
- **Estimated Cost**: 0.075-0.1 ETH (~$225-300)
- **Time**: ~3-5 minutes
- **USDC**: MockUSDC (test token with mint function)

## Next Steps

1. Test vault creation on frontend
2. Update Farcaster Mini App manifest
3. Test in Farcaster app
4. Mint USDC to demo wallets

---

📖 **Full guide**: See `BASE_MAINNET_MANUAL_DEPLOYMENT.md` for detailed instructions and troubleshooting.

