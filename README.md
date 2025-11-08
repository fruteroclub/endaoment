# 🎓 Endaoment - Education Funding through DeFi Yield

**Empowering Latin American students through decentralized yield-generating vaults**

<h4 align="center">
  <a href="https://endaoment-mvp.vercel.app">Live Demo</a> |
  <a href="#-deployed-contracts">Deployed Contracts</a> |
  <a href="#-quick-start">Quick Start</a>
</h4>

🌎 A platform that enables whales and retail users to fund student education by depositing USDC into yield-generating vaults. Students receive 75% of the generated yield based on democratic vote allocation, while whales earn 10% and retail contributors earn 15%.

⚙️ Built using Next.js 15, OnchainKit, Hardhat, Wagmi v2, Viem v2, and Solidity. Deployed as a Farcaster Mini App on Base.

## ✨ Key Features

- 🏦 **ERC-4626 Vault**: Industry-standard yield vault with deposit tracking
- 👥 **Dual User Types**: Whales (1000+ USDC) and Retail (10+ USDC)
- 🗳️ **Democratic Allocation**: Vote-based funding distribution to students
- 💰 **Fair Yield Split**: 75% students, 15% retail, 10% whales
- 👩‍🎓 **8 Latin American Students**: From top universities in Brazil, Mexico, Argentina, Chile, Colombia
- 🔗 **Farcaster Integration**: Share vaults and student profiles on Farcaster
- 📊 **Real-time Dashboard**: Track deposits, allocations, and distributions

---

## 🌟 Open Source Contribution: Scaffold-ETH 2 MCP Server

**We've created an open-source MCP (Model Context Protocol) server that enables universities and organizations worldwide to rapidly build similar endowment platforms using AI-assisted development.**

### 🎁 Our Gift to the Community

As part of this project, we've developed and open-sourced a comprehensive MCP server for Scaffold-ETH 2 that integrates Base Minikit and Farcaster:

<div align="center">
  <h3><a href="https://github.com/troopdegen/se2-minikit-mcp-server">🔗 SE2-Minikit-MCP-Server Repository</a></h3>
  <p><em>Build your own DeFi-powered education funding platform in minutes with Claude AI</em></p>
</div>

### 🚀 What It Does

The MCP server allows **any university, foundation, or organization** to:

- ✅ **Scaffold complete Scaffold-ETH 2 projects** using natural language with Claude
- ✅ **Generate Farcaster Mini Apps** with Base integration out-of-the-box
- ✅ **Deploy smart contracts** with pre-configured templates (NFT, DeFi, DAO, and more)
- ✅ **Configure yield vaults** similar to our endowment system
- ✅ **Customize student registries** for their own beneficiaries

### 💡 Why This Matters

Traditional endowment platforms are:

- 💸 Expensive to build (often $100k+ in development costs)
- ⏰ Time-consuming (6-12 months to launch)
- 🔒 Proprietary and closed-source

**Our MCP server enables any institution to:**

- 🆓 Build for free using open-source tools
- ⚡ Launch in days, not months
- 🤝 Contribute improvements back to the community

### 🎓 Real-World Impact

Universities and organizations can now:

1. **Deploy their own endowment vaults** using our proven smart contract templates
2. **Customize yield distribution** to match their institutional policies
3. **Integrate with Farcaster** for transparent, social fundraising
4. **Scale globally** with Base's low-cost infrastructure

### 📦 Tech Stack

- **Bun** runtime for fast development
- **TypeScript** with strict mode
- **MCP SDK** for Claude AI integration
- **Scaffold-ETH 2** templates
- **Base Minikit** and **OnchainKit**
- **Farcaster** integration

### 🔧 How Organizations Can Use It

```bash
# Install the MCP server
npm install -g @troopdegen/se2-minikit-mcp

# Then ask Claude:
"Create a DeFi endowment vault for Stanford University students"

# Claude will generate a complete, production-ready project!
```

### 🌍 Example Use Cases

- **🎓 Universities**: Create endowments for specific departments or research areas
- **🏛️ Foundations**: Build transparent, yield-generating grant programs
- **🌱 NGOs**: Fund education initiatives with sustainable DeFi yield
- **🏢 Corporations**: Launch employee scholarship programs
- **🌎 DAOs**: Manage community education funds democratically

### 📈 Project Status

✅ **Core Infrastructure** (35/180 points completed)

- MCP server with tool registries
- Template engine with variable substitution
- `scaffold_project` tool (fully functional)
- 337 tests passing (100% coverage)
- Basic Scaffold-ETH 2 template

🚧 **In Development**

- NFT, DeFi, DAO, Gaming, and Social templates
- Automated deployment pipeline
- Contract configuration tools

### 🤝 Contributing

We welcome contributions! Whether you're a:

- 🎓 **University** wanting to adapt this for your institution
- 💻 **Developer** interested in improving the tooling
- 📚 **Educator** with ideas for new features
- 🌍 **Organization** looking to replicate our model

Visit the [repository](https://github.com/troopdegen/se2-minikit-mcp-server) to get started!

---

## 🚀 Deployed Contracts

### 🟢 Base Mainnet (Chain ID: 8453)

**Production deployment for Farcaster Mini App**

| Contract              | Address                                      | Explorer                                                                            |
| --------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| **MockUSDC**          | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` | [BaseScan](https://basescan.org/address/0xF275FB7aF26F08f5053611DAE56570304C4A22fF) |
| **StudentRegistry**   | `0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36` | [BaseScan](https://basescan.org/address/0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36) |
| **AllocationManager** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` | [BaseScan](https://basescan.org/address/0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a) |
| **EndaomentVault**    | `0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09` | [BaseScan](https://basescan.org/address/0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09) |

### 🔵 Base Sepolia (Chain ID: 84532)

**Testnet deployment for development**

| Contract              | Address                                      | Explorer                                                                                            |
| --------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **MockUSDC**          | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` | [BaseScan Sepolia](https://sepolia.basescan.org/address/0xF275FB7aF26F08f5053611DAE56570304C4A22fF) |
| **StudentRegistry**   | `0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36` | [BaseScan Sepolia](https://sepolia.basescan.org/address/0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36) |
| **AllocationManager** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` | [BaseScan Sepolia](https://sepolia.basescan.org/address/0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a) |
| **EndaomentVault**    | `0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09` | [BaseScan Sepolia](https://sepolia.basescan.org/address/0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09) |

### 🔷 Arbitrum Sepolia (Chain ID: 421614)

**Additional testnet deployment**

| Contract              | Address                                      | Explorer                                                                                           |
| --------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **MockUSDC**          | `0xF275FB7aF26F08f5053611DAE56570304C4A22fF` | [Arbiscan Sepolia](https://sepolia.arbiscan.io/address/0xF275FB7aF26F08f5053611DAE56570304C4A22fF) |
| **StudentRegistry**   | `0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36` | [Arbiscan Sepolia](https://sepolia.arbiscan.io/address/0xf6a5E6e0D9077dD34A7EB1F35BB724f278725c36) |
| **AllocationManager** | `0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a` | [Arbiscan Sepolia](https://sepolia.arbiscan.io/address/0x7A03a351Ae970Bd0b810e09f25C1CC86F29aC68a) |
| **EndaomentVault**    | `0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09` | [Arbiscan Sepolia](https://sepolia.arbiscan.io/address/0x253AEc843242a5fbB44Ed53E89e08Eafc15bDC09) |

> 📝 **Note for Judges**: All contracts are verified on their respective block explorers. Detailed deployment documentation available in [`docs/deployments/README.md`](docs/deployments/README.md).

---

## 👩‍🎓 Registered Students

Our platform currently supports 8 students from top Latin American universities:

1. **Ana Silva** - Universidade de São Paulo (USP, Brazil) - AI & Machine Learning
2. **Carlos Mendoza** - Tecnológico de Monterrey (ITESM, Mexico) - Blockchain & Decentralized Systems
3. **María Fernández** - UNAM (Mexico) - Climate Science & Sustainability
4. **João Santos** - UNICAMP (Brazil) - Renewable Energy & Smart Grids
5. **Valentina Rojas** - Universidad de Buenos Aires (Argentina) - Public Health & Social Impact
6. **Diego Ramírez** - Pontificia Universidad Católica de Chile - Quantum Computing & Cryptography
7. **Isabella Costa** - UFRJ (Brazil) - Biotechnology & Gene Therapy
8. **Santiago Torres** - Universidad de los Andes (Colombia) - Financial Inclusion & Web3

---

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## 🎯 Quick Start

### Try the Live Demo

Visit **[endaoment-mvp.vercel.app](https://endaoment-mvp.vercel.app)** to interact with the deployed contracts on Base mainnet.

### Local Development

1. **Clone and install dependencies**:

```bash
git clone <your-repo-url>
cd endaoment
yarn install
```

2. **Run a local network** (Terminal 1):

```bash
yarn chain
```

3. **Deploy contracts locally** (Terminal 2):

```bash
yarn deploy
```

4. **Start the frontend** (Terminal 3):

```bash
yarn start
```

Visit `http://localhost:3000` to see the app. Use the Debug Contracts page at `http://localhost:3000/debug` to interact with contracts directly.

### Deploy to Testnets

```bash
# Deploy to Base Sepolia
cd packages/hardhat
yarn deploy:baseSepolia

# Deploy to Arbitrum Sepolia
yarn deploy:arbitrumSepolia

# Deploy to Base Mainnet
yarn deploy:base
```

### Run Tests

```bash
cd packages/hardhat
yarn test
```

---

## 🧪 How to Test the Platform

### 1. Get Test USDC

The deployer account has 1,000,000 test USDC. To mint more:

```bash
cd packages/hardhat
yarn mint:usdc:baseSepolia  # or mint:usdc:base
```

### 2. Deposit to Vault

- **Whale deposit**: 1000+ USDC
- **Retail deposit**: 10+ USDC

Visit `/vault` page, approve USDC, and deposit.

### 3. Allocate Votes to Students

Visit `/allocate` page and distribute your votes across the 8 registered students.

### 4. View Dashboard

Check `/dashboard` to see total deposits, student allocations, and yield distribution.

### 5. Distribute Yield (after epoch ends)

After 30 days, yield can be distributed based on vote allocations.

---

## 📁 Project Structure

```
endaoment/
├── packages/
│   ├── hardhat/           # Smart contracts & deployment
│   │   ├── contracts/     # Solidity contracts
│   │   ├── deploy/        # Deployment scripts
│   │   ├── test/          # Contract tests
│   │   └── deployments/   # Deployment artifacts
│   └── nextjs/            # Next.js frontend
│       ├── app/           # Next.js 15 App Router
│       ├── components/    # React components
│       ├── hooks/         # Custom React hooks
│       └── contracts/     # Contract ABIs & addresses
├── docs/                  # Documentation
│   ├── deployments/       # Deployment documentation
│   └── workflow/          # Development workflow docs
└── README.md             # This file
```

---

## 🛠️ Tech Stack

### Smart Contracts

- **Solidity 0.8.26**: Smart contract language
- **Hardhat**: Development environment
- **OpenZeppelin**: Secure contract libraries
- **ERC-4626**: Tokenized vault standard

### Frontend

- **Next.js 15**: React framework with App Router
- **OnchainKit**: Coinbase's wallet & Farcaster SDK
- **Wagmi v2**: React hooks for Ethereum
- **Viem v2**: TypeScript Ethereum library
- **TailwindCSS**: Utility-first CSS framework

### Infrastructure

- **Base**: L2 blockchain (mainnet & testnet)
- **Arbitrum Sepolia**: Additional testnet
- **Vercel**: Frontend hosting
- **Farcaster**: Mini App integration

## 📚 Documentation

- **[Deployment Guide](docs/deployments/README.md)**: Detailed contract deployment information
- **[Epic 3: Smart Contracts](docs/workflow/epic-3-smart-contracts.md)**: Contract architecture & design
- **[Epic 4: Contract Integration](docs/workflow/epic-4-contract-integration.md)**: Frontend integration guide
- **[Epic 5: Production Launch](docs/workflow/epic-5-production-launch.md)**: Production deployment checklist
- **[Epic 6: Farcaster Mini App](docs/workflow/epic-6-farcaster-miniapp.md)**: Farcaster integration guide
- **[Farcaster Setup](FARCASTER_SETUP.md)**: Quick setup for Farcaster Mini App
- **[Base Mainnet Deployment](BASE_MAINNET_DEPLOYMENT.md)**: Mainnet deployment guide

---

## 🏗️ Smart Contract Architecture

### Core Contracts

1. **MockUSDC** (`MockUSDC.sol`)

   - ERC-20 test token for development
   - Mimics USDC with 6 decimals
   - Mintable for testing

2. **StudentRegistry** (`StudentRegistry.sol`)

   - Maintains verified student profiles
   - Tracks student funding received
   - Admin-controlled registration

3. **AllocationManager** (`AllocationManager.sol`)

   - Vote allocation system
   - Yield distribution logic
   - Epoch-based settlement
   - Enforces 75/15/10 split

4. **EndaomentVault** (`EndaomentVault.sol`)
   - ERC-4626 compliant vault
   - Tracks whale vs retail deposits
   - Accrues 5% APY (simulated)
   - Immutable after deployment

### Contract Interactions

```
User → EndaomentVault → Deposit USDC
User → AllocationManager → Allocate Votes to Students
Time → Yield Accrual → 5% APY
Admin → AllocationManager → Distribute Yield
Students → Receive USDC
```

---

## 🎨 Frontend Pages

| Page      | Route        | Description                          |
| --------- | ------------ | ------------------------------------ |
| Home      | `/`          | Landing page with project overview   |
| Start     | `/start`     | Onboarding for new users             |
| Vault     | `/vault`     | Deposit USDC, view vault stats       |
| Students  | `/student`   | Browse registered students           |
| Allocate  | `/allocate`  | Vote for students to receive funding |
| Dashboard | `/dashboard` | View your deposits & allocations     |
| Debug     | `/debug`     | Contract interaction interface       |

---

## 🔐 Security Considerations

⚠️ **This is an MVP for hackathon demonstration**

### Current Limitations

- Using MockUSDC instead of real USDC on mainnet (for demo purposes)
- No contract audits performed
- Simplified yield mechanism (time-based minting vs. real DeFi protocols)
- No withdrawal functionality in MVP
- Pre-registered students only (no self-registration)
- Single vault (no factory pattern)

### Production Recommendations

- Complete security audit
- Integrate real yield protocols (Aave, Compound, etc.)
- Implement ERC-4626 withdraw functions
- Add timelock for admin functions
- Implement student verification system
- Add multi-signature for critical operations
- Use real USDC on mainnet

---

## 🌟 Use Cases

### For Whales 🐋

- Deploy capital to generate yield
- Support education in Latin America
- Earn 10% commission on deposits
- Participate in student selection
- Track social impact metrics

### For Retail Users 👥

- Start with just 10 USDC
- Earn 15% yield on deposits
- Vote for students to support
- Join a community-driven initiative
- Learn about DeFi and social impact

### For Students 👩‍🎓

- Receive funding without debt
- Focus on research and studies
- Build reputation on-chain
- Connect with global supporters
- Access to DeFi ecosystem

---

## 🚧 Future Roadmap

- [ ] Integrate real yield protocols (Aave, Compound)
- [ ] Implement vault factory for multiple vaults
- [ ] Add student self-registration with verification
- [ ] Implement quadratic funding for fairer distribution
- [ ] Add withdrawal functionality (full ERC-4626)
- [ ] Create student portfolio pages with research updates
- [ ] Add governance token for platform decisions
- [ ] Integrate with more L2s (Optimism, Arbitrum)
- [ ] Mobile app for students to track funding
- [ ] Analytics dashboard with impact metrics

---

## 🤝 Contributing

This project was built for a hackathon but we welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built with ❤️ for the Base Latam Hackathon

---

## 🙏 Acknowledgments

- **Scaffold-ETH 2** for the excellent development framework
- **Base** for the L2 infrastructure and Farcaster integration
- **Coinbase** for OnchainKit and wallet tools
- **OpenZeppelin** for secure contract libraries
- All the students who inspire this work

---

**🌎 Making education accessible through DeFi, one student at a time.**
