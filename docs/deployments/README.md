# Endaoment Protocol - Deployment Information

## Network: baseSepolia (Chain ID: 84532)

**Deployment Date**: 2025-11-08T08:26:20.745Z  
**Deployer Address**: `0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205`  
**Block Explorer**: https://sepolia.basescan.org

---

## 📋 Contract Addresses

| Contract              | Address                                      | Explorer Link                                                                                       |
| --------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **MockUSDC**          | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` | [View on Explorer](https://sepolia.basescan.org/address/0xF275FB7aF26F08f5053611DAE56570304C4A22fF) |
| **StudentRegistry**   | `0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36` | [View on Explorer](https://sepolia.basescan.org/address/0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36) |
| **AllocationManager** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` | [View on Explorer](https://sepolia.basescan.org/address/0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a) |
| **EndaomentVault**    | `0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09` | [View on Explorer](https://sepolia.basescan.org/address/0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09) |

---

## 🏦 Vault Configuration

| Property                      | Value                                                   |
| ----------------------------- | ------------------------------------------------------- |
| **Name**                      | Endaoment Education Vault                               |
| **Symbol**                    | EDVAULT                                                 |
| **Underlying Asset**          | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` (MockUSDC) |
| **Whale Address**             | `0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205`            |
| **Owner (AllocationManager)** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a`            |
| **Current Total Assets**      | Starts at 0 USDC                                        |
| **APY**                       | 5% (simulated)                                          |

---

## 📊 Allocation Manager Configuration

### Epoch Settings

- **Current Epoch ID**: 0
- **Epoch Duration**: 2592000 seconds (30 days)
- **Epoch Start**: Sat, 08 Nov 2025 08:26:06 GMT
- **Epoch End**: Mon, 08 Dec 2025 08:26:06 GMT

### Yield Split (Basis Points)

| Recipient               | Share    | Percentage |
| ----------------------- | -------- | ---------- |
| **Whale**               | 1000 bps | 10%        |
| **Retail Contributors** | 1500 bps | 15%        |
| **Students**            | 7500 bps | 75%        |

---

## 👩‍🎓 Student Registry

- **Total Registered Students**: 8
- **AllocationManager Set**: ✅ `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a`

### Registered Students

No students registered yet.

---

## 💰 Initial Balances

- **Deployer USDC Balance**: 1000000.0 USDC
- **Vault Total Assets**: 0 USDC (no deposits yet)

---

## 🚀 Quick Start for Testing

### 1. Get Test USDC (if on testnet)

```bash
# The deployer already has 1000000.0 USDC
# To mint more USDC to your test wallet:
npx hardhat run scripts/mintTestUSDC.ts --network baseSepolia
```

### 2. Approve USDC for Vault

```solidity
MockUSDC.approve(0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09, amount)
```

### 3. Deposit to Vault (Whale: 1000+ USDC, Retail: 10+ USDC)

```solidity
EndaomentVault.deposit(amount, recipient)
```

### 4. Allocate Votes to Students

```solidity
AllocationManager.allocateVotes(vaultAddress, studentAddresses[], voteAmounts[])
```

### 5. Distribute Yield (after epoch ends)

```solidity
AllocationManager.distributeYield(vaultAddress)
```

---

## 🔧 Contract Interaction Examples

### Check Your Vault Shares

```javascript
const shares = await vault.balanceOf(yourAddress);
console.log(`You have ${shares} shares`);
```

### Check Vault Total Assets

```javascript
const totalAssets = await vault.totalAssets();
console.log(`Vault has ${ethers.formatUnits(totalAssets, 6)} USDC`);
```

### Check Your Vote Allocation

```javascript
const allocation = await allocationManager.getUserAllocation(
  vaultAddress,
  yourAddress
);
console.log(
  `You allocated ${allocation.totalVotes} votes across ${allocation.students.length} students`
);
```

### View Student Funding Received

```javascript
const funding = await allocationManager.getStudentTotalFunding(studentAddress);
console.log(`Student received ${ethers.formatUnits(funding, 6)} USDC total`);
```

---

## ⚠️ Important Notes

### For Base Sepolia Testnet

- **Get Test ETH**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Network**: Base Sepolia
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Block Explorer**: https://sepolia.basescan.org

### Known Limitations (MVP)

- ⚠️ **Mock Yield**: Using time-based USDC minting, not real yield protocols
- ⚠️ **No Withdrawals**: MVP locks deposits (implement ERC-4626 withdraw for production)
- ⚠️ **Single Vault**: Not using factory pattern for multiple vaults
- ⚠️ **Test Students**: Pre-registered students, no self-registration yet
- ⚠️ **Simplified Voting**: Linear vote allocation, not quadratic funding

---

## 📝 Deployment Verification Commands

### Verify all contracts on block explorer:

```bash
# Verify MockUSDC
npx hardhat verify --network baseSepolia 0xF275FB7aF26F08f5053611DAE56570304C4A22fF

# Verify StudentRegistry
npx hardhat verify --network baseSepolia 0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36

# Verify AllocationManager
npx hardhat verify --network baseSepolia 0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a "0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36"

# Verify EndaomentVault
npx hardhat verify --network baseSepolia 0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09 "0xF275FB7aF26F08f5053611DAE56570304C4A22fF" "Endaoment Education Vault" "EDVAULT" "0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205"
```

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

_Generated automatically by Endaoment deployment script_  
_Last Updated_: 2025-11-08T08:26:20.896Z
