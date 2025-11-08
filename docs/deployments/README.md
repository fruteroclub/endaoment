# Endaoment Protocol - Deployment Information

## Network: base (Chain ID: 8453)

**Deployment Date**: 2025-11-08T09:08:03.107Z  
**Deployer Address**: `0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205`  
**Block Explorer**: https://basescan.org

---

## 📋 Contract Addresses

| Contract | Address | Explorer Link |
|----------|---------|---------------|
| **MockUSDC** | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` | [View on Explorer](https://basescan.org/address/0xF275FB7aF26F08f5053611DAE56570304C4A22fF) |
| **StudentRegistry** | `0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36` | [View on Explorer](https://basescan.org/address/0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36) |
| **AllocationManager** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` | [View on Explorer](https://basescan.org/address/0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a) |
| **EndaomentVault** | `0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09` | [View on Explorer](https://basescan.org/address/0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09) |

---

## 🏦 Vault Configuration

| Property | Value |
|----------|-------|
| **Name** | Endaoment Education Vault |
| **Symbol** | EDVAULT |
| **Underlying Asset** | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` (MockUSDC) |
| **Whale Address** | `0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205` |
| **Owner (AllocationManager)** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` |
| **Current Total Assets** | Starts at 0 USDC |
| **APY** | 5% (simulated) |

---

## 📊 Allocation Manager Configuration

### Epoch Settings
- **Current Epoch ID**: 0
- **Epoch Duration**: 2592000 seconds (30 days)
- **Epoch Start**: Sat, 08 Nov 2025 09:07:05 GMT
- **Epoch End**: Mon, 08 Dec 2025 09:07:05 GMT

### Yield Split (Basis Points)
| Recipient | Share | Percentage |
|-----------|-------|------------|
| **Whale** | 1000 bps | 10% |
| **Retail Contributors** | 1500 bps | 15% |
| **Students** | 7500 bps | 75% |

---

## 👩‍🎓 Student Registry

- **Total Registered Students**: 8
- **AllocationManager Set**: ✅ `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a`

### Registered Students

1. **Ana Silva** - Universidade de São Paulo (USP)
   - Research: Artificial Intelligence & Machine Learning
   - Address: `0x1111111111111111111111111111111111111111`
   - Funding Received: 0 USDC

2. **Carlos Mendoza** - Tecnológico de Monterrey (ITESM)
   - Research: Blockchain & Decentralized Systems
   - Address: `0x2222222222222222222222222222222222222222`
   - Funding Received: 0 USDC

3. **María Fernández** - Universidad Nacional Autónoma de México (UNAM)
   - Research: Climate Science & Sustainability
   - Address: `0x3333333333333333333333333333333333333333`
   - Funding Received: 0 USDC

4. **João Santos** - Universidade Estadual de Campinas (UNICAMP)
   - Research: Renewable Energy & Smart Grids
   - Address: `0x4444444444444444444444444444444444444444`
   - Funding Received: 0 USDC

5. **Valentina Rojas** - Universidad de Buenos Aires (UBA)
   - Research: Public Health & Social Impact
   - Address: `0x5555555555555555555555555555555555555555`
   - Funding Received: 0 USDC

6. **Diego Ramírez** - Pontificia Universidad Católica de Chile
   - Research: Quantum Computing & Cryptography
   - Address: `0x6666666666666666666666666666666666666666`
   - Funding Received: 0 USDC

7. **Isabella Costa** - Universidade Federal do Rio de Janeiro (UFRJ)
   - Research: Biotechnology & Gene Therapy
   - Address: `0x7777777777777777777777777777777777777777`
   - Funding Received: 0 USDC

8. **Santiago Torres** - Universidad de los Andes (Colombia)
   - Research: Financial Inclusion & Web3
   - Address: `0x8888888888888888888888888888888888888888`
   - Funding Received: 0 USDC

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
npx hardhat run scripts/mintTestUSDC.ts --network base
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
const allocation = await allocationManager.getUserAllocation(vaultAddress, yourAddress);
console.log(`You allocated ${allocation.totalVotes} votes across ${allocation.students.length} students`);
```

### View Student Funding Received
```javascript
const funding = await allocationManager.getStudentTotalFunding(studentAddress);
console.log(`Student received ${ethers.formatUnits(funding, 6)} USDC total`);
```

---

## ⚠️ Important Notes

### For Production


- **Production Network**: Ensure all security measures are in place
- **Audit Status**: Contract should be audited before mainnet use


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
npx hardhat verify --network base 0xF275FB7aF26F08f5053611DAE56570304C4A22fF

# Verify StudentRegistry
npx hardhat verify --network base 0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36

# Verify AllocationManager
npx hardhat verify --network base 0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a "0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36"

# Verify EndaomentVault
npx hardhat verify --network base 0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09 "0xF275FB7aF26F08f5053611DAE56570304C4A22fF" "Endaoment Education Vault" "EDVAULT" "0xcd95569742Ec931BB4879ccC7EAA9f5BD9d2E205"
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

*Generated automatically by Endaoment deployment script*  
*Last Updated*: 2025-11-08T09:08:24.838Z
