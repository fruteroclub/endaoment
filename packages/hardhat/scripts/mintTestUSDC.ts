import { ethers, network } from "hardhat";

/**
 * Helper script to mint test USDC to specific addresses
 * Usage: npx hardhat run scripts/mintTestUSDC.ts --network baseSepolia
 */
async function main() {
  console.log(`\n💰 Minting test USDC on ${network.name}...`);

  try {
    const mockUSDC = await ethers.getContract("MockUSDC");
    const [deployer] = await ethers.getSigners();

    console.log(`Using MockUSDC at: ${await mockUSDC.getAddress()}`);
    console.log(`Deployer: ${deployer.address}`);

    // Define recipients and amounts
    // Replace these addresses with your actual test wallet addresses
    const recipients = [
      {
        address: deployer.address, // Deployer gets extra USDC
        amount: ethers.parseUnits("5000", 6), // 5000 USDC
        label: "Deployer (whale test)",
      },
      // Add more test wallets here:
      // {
      //   address: "0xYourWalletAddress",
      //   amount: ethers.parseUnits("2000", 6), // 2000 USDC for whale
      //   label: "Whale Wallet"
      // },
      // {
      //   address: "0xYourRetailWallet1",
      //   amount: ethers.parseUnits("100", 6), // 100 USDC for retail
      //   label: "Retail Wallet 1"
      // },
    ];

    console.log(`\nMinting USDC to ${recipients.length} addresses...\n`);

    for (const recipient of recipients) {
      const tx = await mockUSDC.mint(recipient.address, recipient.amount);
      await tx.wait();

      const balanceAfter = await mockUSDC.balanceOf(recipient.address);
      const minted = ethers.formatUnits(recipient.amount, 6);
      const newBalance = ethers.formatUnits(balanceAfter, 6);

      console.log(`✅ ${recipient.label}`);
      console.log(`   Address: ${recipient.address}`);
      console.log(`   Minted: ${minted} USDC`);
      console.log(`   New Balance: ${newBalance} USDC\n`);
    }

    console.log(`✅ Successfully minted USDC to ${recipients.length} recipients`);
  } catch (error) {
    console.error("❌ Error minting USDC:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
