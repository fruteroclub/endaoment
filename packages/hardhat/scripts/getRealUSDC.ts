import { network } from "hardhat";

/**
 * Helper to get the correct USDC address based on network
 */
export function getUSDCAddress(networkName: string): string {
  // Real USDC addresses on production networks
  const USDC_ADDRESSES: Record<string, string> = {
    base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // Base Mainnet USDC
    mainnet: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Ethereum Mainnet USDC
    arbitrum: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // Arbitrum One USDC
    optimism: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // Optimism USDC
    polygon: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // Polygon USDC
  };

  return USDC_ADDRESSES[networkName] || "";
}

export function isMainnet(networkName: string): boolean {
  return ["base", "mainnet", "arbitrum", "optimism", "polygon"].includes(networkName);
}

export function isTestnet(networkName: string): boolean {
  return (
    networkName.includes("Sepolia") ||
    networkName.includes("testnet") ||
    networkName === "localhost" ||
    networkName === "hardhat"
  );
}

async function main() {
  const networkName = network.name;
  console.log(`\n🌐 Network: ${networkName}`);

  if (isMainnet(networkName)) {
    const usdcAddress = getUSDCAddress(networkName);
    if (usdcAddress) {
      console.log(`💵 USDC Address: ${usdcAddress}`);
      console.log(`📊 View on Explorer: https://basescan.org/address/${usdcAddress}`);
    } else {
      console.log(`⚠️  No USDC address configured for ${networkName}`);
    }
  } else {
    console.log(`🧪 Testnet detected - will deploy MockUSDC`);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
