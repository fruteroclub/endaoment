# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Scaffold-ETH 2 (SE-2) project - a toolkit for building decentralized applications (dapps) on Ethereum. It's a Yarn monorepo with two main packages:

- **hardhat** (`packages/hardhat/`): Solidity framework for writing, testing, and deploying EVM smart contracts
- **nextjs** (`packages/nextjs/`): Next.js frontend (App Router) with utilities for smart contract interaction

**Tech Stack**: Next.js, RainbowKit, Wagmi, Viem, Hardhat, TypeScript

## Development Commands

### Initial Setup
```bash
yarn install                    # Install dependencies
```

### Local Development (3 terminals required)
```bash
yarn chain                      # Terminal 1: Start local Hardhat network
yarn deploy                     # Terminal 2: Deploy contracts to local network
yarn start                      # Terminal 3: Start Next.js frontend at http://localhost:3000
```

### Smart Contract Development
```bash
yarn hardhat:compile            # Compile Solidity contracts
yarn hardhat:test               # Run contract tests with gas reporting
yarn deploy                     # Deploy contracts (runs packages/hardhat/deploy scripts)
yarn hardhat:verify             # Verify contracts on Etherscan
yarn hardhat:clean              # Clean artifacts and cache
```

### Frontend Development
```bash
yarn start                      # Start Next.js dev server (alias for next:dev)
yarn next:build                 # Build production frontend
yarn next:lint                  # Lint Next.js code
yarn next:check-types           # TypeScript type checking
```

### Linting & Formatting
```bash
yarn lint                       # Lint both packages (next:lint + hardhat:lint)
yarn format                     # Format both packages (next:format + hardhat:format)
```

### Deployment
```bash
yarn vercel                     # Deploy to Vercel
yarn ipfs                       # Deploy to IPFS
```

### Account Management
```bash
yarn account:generate           # Generate new account
yarn account:import             # Import existing private key
yarn account:reveal-pk          # Reveal private key of deployer account
```

## Architecture

### Smart Contracts (`packages/hardhat/`)
- **Contracts**: `packages/hardhat/contracts/` - Solidity smart contracts
- **Deployment**: `packages/hardhat/deploy/` - Hardhat-deploy scripts (numbered, e.g., `00_deploy_your_contract.ts`)
- **Tests**: `packages/hardhat/test/` - Contract test files
- **Configuration**: `packages/hardhat/hardhat.config.ts` - Network configs, compiler settings

### Frontend (`packages/nextjs/`)

#### Contract Interaction Hooks (CRITICAL)
Always use SE-2's specialized hooks for contract interaction. Located in `packages/nextjs/hooks/scaffold-eth/`:

**Reading contract data** - Use `useScaffoldReadContract`:
```typescript
const { data: someData } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "functionName",
  args: [arg1, arg2], // optional
});
```

**Writing to contracts** - Use `useScaffoldWriteContract`:
```typescript
const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract(
  { contractName: "YourContract" }
);
// Usage
await writeContractAsync({
  functionName: "functionName",
  args: [arg1, arg2],
  value: parseEther("0.1"), // optional for payable functions
});
```

**Reading contract events** - Use `useScaffoldEventHistory`:
```typescript
const { data: events, isLoading, error } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  watch: true, // optional, watch for new events
});
```

**Other hooks**: `useScaffoldWatchContractEvent`, `useDeployedContractInfo`, `useScaffoldContract`, `useTransactor`

#### UI Components
Scaffold-ETH provides pre-built components in `packages/nextjs/components/scaffold-eth/`:
- **Address**: Display Ethereum addresses (always use this, not raw addresses)
- **AddressInput**: Input field for Ethereum addresses (always use this)
- **Balance**: Display ETH/USDC balance of an address
- **EtherInput**: Number input with ETH/USD conversion

#### Contract Data
- `packages/nextjs/contracts/deployedContracts.ts` - Auto-generated from Hardhat deployments
- `packages/nextjs/contracts/externalContracts.ts` - External contract ABIs

#### Configuration
- `packages/nextjs/scaffold.config.ts` - Network settings, API keys, wallet config
  - `targetNetworks`: Networks the dApp runs on (default: `[chains.hardhat]`)
  - `pollingInterval`: RPC polling frequency
  - `alchemyApiKey`: Alchemy API key (use env: `NEXT_PUBLIC_ALCHEMY_API_KEY`)
  - `walletConnectProjectId`: WalletConnect project ID (use env: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`)

#### App Structure
- Next.js App Router (not Pages Router)
- Routes: `packages/nextjs/app/`
  - `/` - Homepage (`page.tsx`)
  - `/debug` - Debug Contracts UI (interact with contracts via auto-generated UI)
  - `/blockexplorer` - Local block explorer

## Typical Development Workflow

1. Start local blockchain: `yarn chain`
2. Write smart contracts in `packages/hardhat/contracts/`
3. Modify deployment script in `packages/hardhat/deploy/` if needed
4. Deploy locally: `yarn deploy`
5. Visit `http://localhost:3000/debug` to interact with contracts via UI
6. Iterate on contract functionality
7. Write tests in `packages/hardhat/test/`
8. Build custom UI using SE-2 components and hooks
9. Deploy to live network (update `scaffold.config.ts` target networks)
10. Deploy frontend: `yarn vercel` or `yarn ipfs`

## Important Patterns

### Contract Interaction Rules
- **Never** use raw wagmi/viem hooks directly for contract reads/writes
- **Always** use SE-2's `useScaffoldReadContract`, `useScaffoldWriteContract`, and `useScaffoldEventHistory` hooks
- Contract data is automatically loaded from `deployedContracts.ts` and `externalContracts.ts`

### UI Component Rules
- **Always** use SE-2's `<Address>` component for displaying addresses
- **Always** use SE-2's `<AddressInput>` component for address inputs
- Use `<Balance>` for balance displays
- Use `<EtherInput>` for ETH amount inputs

### Environment Variables
- Hardhat: `.env` in `packages/hardhat/` (for deployment private key, API keys)
- Next.js: `.env.local` for local, Vercel env config for production
- `NEXT_PUBLIC_ALCHEMY_API_KEY` - Alchemy RPC provider
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect integration
- `__RUNTIME_DEPLOYER_PRIVATE_KEY` - Private key for contract deployment

## Key Files to Modify

- `packages/hardhat/contracts/YourContract.sol` - Your smart contract
- `packages/hardhat/deploy/00_deploy_your_contract.ts` - Deployment script
- `packages/nextjs/app/page.tsx` - Homepage UI
- `packages/nextjs/scaffold.config.ts` - Network and API configuration
- `packages/hardhat/hardhat.config.ts` - Hardhat network configuration

## Testing

- Run contract tests: `yarn hardhat:test`
- Tests use Hardhat Network with gas reporting enabled (`REPORT_GAS=true`)
- Write tests in `packages/hardhat/test/` using Chai matchers
