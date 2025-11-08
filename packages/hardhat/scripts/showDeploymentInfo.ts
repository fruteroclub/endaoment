import { ethers, network } from "hardhat";

/**
 * Displays comprehensive deployment information
 * Usage: npx hardhat run scripts/showDeploymentInfo.ts --network baseSepolia
 */
async function main() {
  console.log(`\n📊 Deployment Information for ${network.name}\n`);
  console.log("=".repeat(60));

  try {
    const [deployer] = await ethers.getSigners();

    // Get all contracts
    const mockUSDC = await ethers.getContract("MockUSDC");
    const studentRegistry = await ethers.getContract("StudentRegistry");
    const allocationManager = await ethers.getContract("AllocationManager");
    const vault = await ethers.getContract("EndaomentVault");

    // Contract Addresses
    console.log("\n📋 CONTRACT ADDRESSES");
    console.log("-".repeat(60));
    console.log(`MockUSDC:           ${await mockUSDC.getAddress()}`);
    console.log(`StudentRegistry:    ${await studentRegistry.getAddress()}`);
    console.log(`AllocationManager:  ${await allocationManager.getAddress()}`);
    console.log(`EndaomentVault:     ${await vault.getAddress()}`);

    // Vault Information
    console.log("\n🏦 VAULT INFORMATION");
    console.log("-".repeat(60));
    console.log(`Name:               ${await vault.name()}`);
    console.log(`Symbol:             ${await vault.symbol()}`);
    console.log(`Asset:              ${await vault.asset()}`);
    console.log(`Whale:              ${await vault.whale()}`);
    console.log(`Owner:              ${await vault.owner()}`);
    console.log(`Total Assets:       ${ethers.formatUnits(await vault.totalAssets(), 6)} USDC`);
    console.log(`Total Supply:       ${ethers.formatUnits(await vault.totalSupply(), 18)} shares`);

    // Epoch Information
    console.log("\n⏰ EPOCH INFORMATION");
    console.log("-".repeat(60));
    const currentEpoch = await allocationManager.getCurrentEpoch();
    const epochDuration = await allocationManager.EPOCH_DURATION();
    console.log(`Current Epoch ID:   ${currentEpoch.id}`);
    console.log(`Duration:           ${Number(epochDuration)} seconds (${Number(epochDuration) / 86400} days)`);
    console.log(`Start Time:         ${new Date(Number(currentEpoch.startTime) * 1000).toUTCString()}`);
    console.log(`End Time:           ${new Date(Number(currentEpoch.endTime) * 1000).toUTCString()}`);

    const now = Math.floor(Date.now() / 1000);
    const timeRemaining = Number(currentEpoch.endTime) - now;
    if (timeRemaining > 0) {
      console.log(`Time Remaining:     ${Math.floor(timeRemaining / 3600)} hours`);
    } else {
      console.log(`Status:             ⚠️ Epoch ended, ready for distribution`);
    }

    // Yield Split
    console.log("\n💰 YIELD SPLIT CONFIGURATION");
    console.log("-".repeat(60));
    const whaleShare = await allocationManager.WHALE_SHARE_BPS();
    const retailShare = await allocationManager.RETAIL_SHARE_BPS();
    const studentShare = await allocationManager.STUDENT_SHARE_BPS();
    console.log(`Whale:              ${Number(whaleShare) / 100}% (${whaleShare} bps)`);
    console.log(`Retail:             ${Number(retailShare) / 100}% (${retailShare} bps)`);
    console.log(`Students:           ${Number(studentShare) / 100}% (${studentShare} bps)`);

    // Students
    console.log("\n👩‍🎓 REGISTERED STUDENTS");
    console.log("-".repeat(60));
    const studentCount = await studentRegistry.getStudentCount();
    console.log(`Total Students:     ${studentCount}\n`);

    // Get all student addresses
    const studentAddresses = await studentRegistry.getAllStudents();

    for (let i = 0; i < studentAddresses.length; i++) {
      const studentAddr = studentAddresses[i];
      const student = await studentRegistry.getStudent(studentAddr);
      const funding = await allocationManager.getStudentTotalFunding(studentAddr);

      console.log(`${i + 1}. ${student.name} - ${student.university}`);
      console.log(`   Research: ${student.researchArea}`);
      console.log(`   Address:  ${studentAddr}`);
      console.log(`   Funding:  ${ethers.formatUnits(funding, 6)} USDC`);
      console.log("");
    }

    // Deployer Balance
    console.log("\n💵 DEPLOYER BALANCE");
    console.log("-".repeat(60));
    console.log(`Address:            ${deployer.address}`);
    const ethBalance = await ethers.provider.getBalance(deployer.address);
    console.log(`ETH Balance:        ${ethers.formatEther(ethBalance)} ETH`);
    const usdcBalance = await mockUSDC.balanceOf(deployer.address);
    console.log(`USDC Balance:       ${ethers.formatUnits(usdcBalance, 6)} USDC`);
    const vaultShares = await vault.balanceOf(deployer.address);
    console.log(`Vault Shares:       ${ethers.formatUnits(vaultShares, 18)} shares`);

    console.log("\n" + "=".repeat(60));
    console.log("✅ Deployment info retrieved successfully\n");
  } catch (error) {
    console.error("❌ Error retrieving deployment info:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
