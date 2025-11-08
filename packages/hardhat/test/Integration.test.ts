import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { AllocationManager, StudentRegistry, EndaomentVault, MockUSDC } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Integration Tests: Complete Vault Lifecycle", function () {
  let usdc: MockUSDC;
  let studentRegistry: StudentRegistry;
  let allocationManager: AllocationManager;
  let vault1: EndaomentVault;
  let vault2: EndaomentVault;

  let whale: HardhatEthersSigner;
  let retail1: HardhatEthersSigner;
  let retail2: HardhatEthersSigner;
  let student1: HardhatEthersSigner;
  let student2: HardhatEthersSigner;
  let student3: HardhatEthersSigner;
  let student4: HardhatEthersSigner;
  let student5: HardhatEthersSigner;
  let student6: HardhatEthersSigner;
  let student7: HardhatEthersSigner;
  let student8: HardhatEthersSigner;

  const WHALE_DEPOSIT = 10_000n * 10n ** 6n; // 10,000 USDC
  const RETAIL1_DEPOSIT = 100n * 10n ** 6n; // 100 USDC
  const RETAIL2_DEPOSIT = 50n * 10n ** 6n; // 50 USDC
  const EPOCH_DURATION = 30n * 24n * 60n * 60n; // 30 days

  beforeEach(async function () {
    [, whale, retail1, retail2, student1, student2, student3, student4, student5, student6, student7, student8] =
      await ethers.getSigners();

    // Deploy MockUSDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdc = await MockUSDC.deploy();
    await usdc.waitForDeployment();

    // Deploy StudentRegistry
    const StudentRegistry = await ethers.getContractFactory("StudentRegistry");
    studentRegistry = await StudentRegistry.deploy();
    await studentRegistry.waitForDeployment();

    // Add 8 test students
    await studentRegistry.addStudent(student1.address, "Alice Chen", "MIT", "AI & Robotics");
    await studentRegistry.addStudent(student2.address, "Bob Martinez", "Stanford", "Climate Science");
    await studentRegistry.addStudent(student3.address, "Carol Johnson", "Harvard", "Public Health");
    await studentRegistry.addStudent(student4.address, "David Kim", "UC Berkeley", "Renewable Energy");
    await studentRegistry.addStudent(student5.address, "Emma Thompson", "Oxford", "Neuroscience");
    await studentRegistry.addStudent(student6.address, "Frank Rodriguez", "CalTech", "Quantum Computing");
    await studentRegistry.addStudent(student7.address, "Grace Liu", "Princeton", "Social Justice");
    await studentRegistry.addStudent(student8.address, "Henry Okonkwo", "Cambridge", "Biotechnology");

    // Deploy AllocationManager
    const AllocationManager = await ethers.getContractFactory("AllocationManager");
    allocationManager = await AllocationManager.deploy(await studentRegistry.getAddress());
    await allocationManager.waitForDeployment();

    // Set AllocationManager in StudentRegistry
    await studentRegistry.setAllocationManager(await allocationManager.getAddress());

    // Fund participants
    await usdc.transfer(whale.address, WHALE_DEPOSIT);
    await usdc.transfer(retail1.address, RETAIL1_DEPOSIT);
    await usdc.transfer(retail2.address, RETAIL2_DEPOSIT);
  });

  describe("Complete Vault Lifecycle", function () {
    it("Should execute full lifecycle: deposit → yield → vote → distribute", async function () {
      // 1. Deploy vault
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Education Impact Vault", "EDVAULT", whale.address);
      await vault1.waitForDeployment();

      // Transfer ownership to AllocationManager
      await vault1.transferOwnership(await allocationManager.getAddress());

      // Register vault
      await allocationManager.registerVault(await vault1.getAddress());

      // 2. Whale deposits 10,000 USDC
      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      const whaleShares = await vault1.balanceOf(whale.address);
      expect(whaleShares).to.equal(WHALE_DEPOSIT); // 1:1 initial ratio

      // 3. Retail1 deposits 100 USDC
      await usdc.connect(retail1).approve(await vault1.getAddress(), RETAIL1_DEPOSIT);
      await vault1.connect(retail1).deposit(RETAIL1_DEPOSIT, retail1.address);

      const retail1Shares = await vault1.balanceOf(retail1.address);
      expect(retail1Shares).to.be.closeTo(RETAIL1_DEPOSIT, RETAIL1_DEPOSIT / 1000n); // Within 0.1%

      // 4. Retail2 deposits 50 USDC
      await usdc.connect(retail2).approve(await vault1.getAddress(), RETAIL2_DEPOSIT);
      await vault1.connect(retail2).deposit(RETAIL2_DEPOSIT, retail2.address);

      const retail2Shares = await vault1.balanceOf(retail2.address);
      expect(retail2Shares).to.be.closeTo(RETAIL2_DEPOSIT, RETAIL2_DEPOSIT / 1000n); // Within 0.1%

      // 5. Fast-forward time by 30 days for yield accrual
      await time.increase(EPOCH_DURATION);

      // Check that yield has accrued (5% APY over 30 days)
      const availableYield = await vault1.getAvailableYield();
      const totalDeposited = WHALE_DEPOSIT + RETAIL1_DEPOSIT + RETAIL2_DEPOSIT;
      const expectedYield = (totalDeposited * 500n * EPOCH_DURATION) / (10000n * 365n * 24n * 60n * 60n);
      expect(availableYield).to.be.closeTo(expectedYield, expectedYield / 100n); // Within 1%

      // 6. Allocate votes
      // Whale: 50% to student1, 50% to student2
      await allocationManager
        .connect(whale)
        .allocateVotes(
          await vault1.getAddress(),
          [student1.address, student2.address],
          [whaleShares / 2n, whaleShares / 2n],
        );

      // Retail1: 100% to student1
      await allocationManager
        .connect(retail1)
        .allocateVotes(await vault1.getAddress(), [student1.address], [retail1Shares]);

      // Retail2: 100% to student3
      await allocationManager
        .connect(retail2)
        .allocateVotes(await vault1.getAddress(), [student3.address], [retail2Shares]);

      // 7. Finalize epoch
      await allocationManager.finalizeEpoch();

      // 8. Distribute yield
      const whaleBalanceBefore = await usdc.balanceOf(whale.address);
      const retail1BalanceBefore = await usdc.balanceOf(retail1.address);
      const retail2BalanceBefore = await usdc.balanceOf(retail2.address);
      const student1BalanceBefore = await usdc.balanceOf(student1.address);
      const student2BalanceBefore = await usdc.balanceOf(student2.address);
      const student3BalanceBefore = await usdc.balanceOf(student3.address);

      await allocationManager.distributeYield(0, await vault1.getAddress());

      const whaleBalanceAfter = await usdc.balanceOf(whale.address);
      const retail1BalanceAfter = await usdc.balanceOf(retail1.address);
      const retail2BalanceAfter = await usdc.balanceOf(retail2.address);
      const student1BalanceAfter = await usdc.balanceOf(student1.address);
      const student2BalanceAfter = await usdc.balanceOf(student2.address);
      const student3BalanceAfter = await usdc.balanceOf(student3.address);

      // 9. Verify distributions
      const whaleReceived = whaleBalanceAfter - whaleBalanceBefore;
      const retail1Received = retail1BalanceAfter - retail1BalanceBefore;
      const retail2Received = retail2BalanceAfter - retail2BalanceBefore;
      const student1Received = student1BalanceAfter - student1BalanceBefore;
      const student2Received = student2BalanceAfter - student2BalanceBefore;
      const student3Received = student3BalanceAfter - student3BalanceBefore;

      // Whale should receive 10% of yield
      const expectedWhaleShare = (availableYield * 1000n) / 10000n;
      expect(whaleReceived).to.be.closeTo(expectedWhaleShare, expectedWhaleShare / 100n);

      // Retail combined should receive 15% of yield, proportional to their vault shares
      // Retail has 150 shares out of 10,150 total shares (including whale)
      const retailShares = retail1Shares + retail2Shares;
      const totalShares = whaleShares + retailShares;
      const expectedRetailShare = (availableYield * 1500n) / 10000n;
      const expectedRetailProportional = (expectedRetailShare * retailShares) / totalShares;
      const totalRetailReceived = retail1Received + retail2Received;
      expect(totalRetailReceived).to.be.closeTo(expectedRetailProportional, expectedRetailProportional / 10n); // Within 10%

      // Retail1 should receive proportional to their shares
      const expectedRetail1Proportional = (expectedRetailProportional * retail1Shares) / retailShares;
      expect(retail1Received).to.be.closeTo(expectedRetail1Proportional, expectedRetail1Proportional / 10n); // Within 10%

      // Students combined should receive 75% of yield
      const expectedStudentShare = (availableYield * 7500n) / 10000n;
      const totalStudentReceived = student1Received + student2Received + student3Received;
      expect(totalStudentReceived).to.be.closeTo(expectedStudentShare, expectedStudentShare / 100n);

      // Student1 should receive based on votes: (5000 whale + 100 retail1) / 10150 total
      expect(student1Received).to.be.gt(0);
      expect(student2Received).to.be.gt(0);
      expect(student3Received).to.be.gt(0);

      // 10. Verify student funding recorded
      const student1Data = await studentRegistry.getStudent(student1.address);
      expect(student1Data.totalReceived).to.equal(student1Received);

      const student2Data = await studentRegistry.getStudent(student2.address);
      expect(student2Data.totalReceived).to.equal(student2Received);

      const student3Data = await studentRegistry.getStudent(student3.address);
      expect(student3Data.totalReceived).to.equal(student3Received);
    });
  });

  describe("Multi-Vault Integration", function () {
    it("Should handle independent vaults with separate allocations", async function () {
      // Create vault 1 for whale + retail1
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Vault 1", "V1", whale.address);
      await vault1.waitForDeployment();
      await vault1.transferOwnership(await allocationManager.getAddress());
      await allocationManager.registerVault(await vault1.getAddress());

      // Create vault 2 for retail2
      vault2 = await EndaomentVault.deploy(await usdc.getAddress(), "Vault 2", "V2", retail2.address);
      await vault2.waitForDeployment();
      await vault2.transferOwnership(await allocationManager.getAddress());
      await allocationManager.registerVault(await vault2.getAddress());

      // Deposits
      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      await usdc.connect(retail1).approve(await vault1.getAddress(), RETAIL1_DEPOSIT);
      await vault1.connect(retail1).deposit(RETAIL1_DEPOSIT, retail1.address);

      await usdc.connect(retail2).approve(await vault2.getAddress(), RETAIL2_DEPOSIT);
      await vault2.connect(retail2).deposit(RETAIL2_DEPOSIT, retail2.address);

      const whaleShares = await vault1.balanceOf(whale.address);
      const retail1Shares = await vault1.balanceOf(retail1.address);
      const retail2Shares = await vault2.balanceOf(retail2.address);

      // Allocate votes independently per vault
      // Vault 1: Whale → student1, Retail1 → student2
      await allocationManager
        .connect(whale)
        .allocateVotes(await vault1.getAddress(), [student1.address], [whaleShares]);

      await allocationManager
        .connect(retail1)
        .allocateVotes(await vault1.getAddress(), [student2.address], [retail1Shares]);

      // Vault 2: Retail2 → student3
      await allocationManager
        .connect(retail2)
        .allocateVotes(await vault2.getAddress(), [student3.address], [retail2Shares]);

      // Verify votes are independent per vault
      const student1Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student1.address);
      expect(student1Votes).to.equal(whaleShares);

      const student2Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student2.address);
      expect(student2Votes).to.equal(retail1Shares);

      const student3VotesVault1 = await allocationManager.getStudentVotes(
        0,
        await vault1.getAddress(),
        student3.address,
      );
      expect(student3VotesVault1).to.equal(0); // No votes in vault1

      const student3VotesVault2 = await allocationManager.getStudentVotes(
        0,
        await vault2.getAddress(),
        student3.address,
      );
      expect(student3VotesVault2).to.equal(retail2Shares);

      // Verify registered vaults
      const vaults = await allocationManager.getRegisteredVaults();
      expect(vaults.length).to.equal(2);
      expect(vaults).to.include(await vault1.getAddress());
      expect(vaults).to.include(await vault2.getAddress());
    });
  });

  describe("Edge Cases", function () {
    it("Should handle single participant vault", async function () {
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Solo Vault", "SOLO", whale.address);
      await vault1.waitForDeployment();
      await vault1.transferOwnership(await allocationManager.getAddress());
      await allocationManager.registerVault(await vault1.getAddress());

      // Only whale deposits
      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      const whaleShares = await vault1.balanceOf(whale.address);

      // Allocate all votes to student1
      await allocationManager
        .connect(whale)
        .allocateVotes(await vault1.getAddress(), [student1.address], [whaleShares]);

      // Fast forward and finalize
      await time.increase(EPOCH_DURATION);
      await allocationManager.finalizeEpoch();

      // Distribute
      const whaleBalanceBefore = await usdc.balanceOf(whale.address);
      const student1BalanceBefore = await usdc.balanceOf(student1.address);

      await allocationManager.distributeYield(0, await vault1.getAddress());

      const whaleBalanceAfter = await usdc.balanceOf(whale.address);
      const student1BalanceAfter = await usdc.balanceOf(student1.address);

      // Whale should still get 10% (even though they're the only participant)
      const whaleReceived = whaleBalanceAfter - whaleBalanceBefore;
      expect(whaleReceived).to.be.gt(0);

      // Student should get 75%
      const student1Received = student1BalanceAfter - student1BalanceBefore;
      expect(student1Received).to.be.gt(0);
      expect(student1Received).to.be.gt(whaleReceived * 5n); // Student gets ~7.5x more
    });

    it("Should handle vote reallocation", async function () {
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Test Vault", "TEST", whale.address);
      await vault1.waitForDeployment();
      await vault1.transferOwnership(await allocationManager.getAddress());
      await allocationManager.registerVault(await vault1.getAddress());

      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      const whaleShares = await vault1.balanceOf(whale.address);

      // Initial allocation: 100% to student1
      await allocationManager
        .connect(whale)
        .allocateVotes(await vault1.getAddress(), [student1.address], [whaleShares]);

      let student1Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student1.address);
      expect(student1Votes).to.equal(whaleShares);

      // Reallocate: 50% to student1, 50% to student2
      await allocationManager
        .connect(whale)
        .allocateVotes(
          await vault1.getAddress(),
          [student1.address, student2.address],
          [whaleShares / 2n, whaleShares / 2n],
        );

      student1Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student1.address);
      const student2Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student2.address);

      expect(student1Votes).to.equal(whaleShares / 2n);
      expect(student2Votes).to.equal(whaleShares / 2n);
    });

    it("Should handle deactivated student", async function () {
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Test Vault", "TEST", whale.address);
      await vault1.waitForDeployment();
      await vault1.transferOwnership(await allocationManager.getAddress());
      await allocationManager.registerVault(await vault1.getAddress());

      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      const whaleShares = await vault1.balanceOf(whale.address);

      // Deactivate student1
      await studentRegistry.deactivateStudent(student1.address);

      // Try to allocate to deactivated student (should fail)
      await expect(
        allocationManager.connect(whale).allocateVotes(await vault1.getAddress(), [student1.address], [whaleShares]),
      ).to.be.revertedWith("Student not active");

      // Should work with active student
      await allocationManager
        .connect(whale)
        .allocateVotes(await vault1.getAddress(), [student2.address], [whaleShares]);

      const student2Votes = await allocationManager.getStudentVotes(0, await vault1.getAddress(), student2.address);
      expect(student2Votes).to.equal(whaleShares);
    });
  });

  describe("Participant Tracking", function () {
    it("Should track all vault participants correctly", async function () {
      const EndaomentVault = await ethers.getContractFactory("EndaomentVault");
      vault1 = await EndaomentVault.deploy(await usdc.getAddress(), "Test Vault", "TEST", whale.address);
      await vault1.waitForDeployment();

      // Multiple deposits
      await usdc.connect(whale).approve(await vault1.getAddress(), WHALE_DEPOSIT);
      await vault1.connect(whale).deposit(WHALE_DEPOSIT, whale.address);

      await usdc.connect(retail1).approve(await vault1.getAddress(), RETAIL1_DEPOSIT);
      await vault1.connect(retail1).deposit(RETAIL1_DEPOSIT, retail1.address);

      await usdc.connect(retail2).approve(await vault1.getAddress(), RETAIL2_DEPOSIT);
      await vault1.connect(retail2).deposit(RETAIL2_DEPOSIT, retail2.address);

      // Check participant count
      expect(await vault1.getParticipantCount()).to.equal(3);

      // Verify all are participants
      expect(await vault1.isParticipantAddress(whale.address)).to.equal(true);
      expect(await vault1.isParticipantAddress(retail1.address)).to.equal(true);
      expect(await vault1.isParticipantAddress(retail2.address)).to.equal(true);

      // Get all participants
      const participants = await vault1.getParticipants();
      expect(participants.length).to.equal(3);
      expect(participants).to.include(whale.address);
      expect(participants).to.include(retail1.address);
      expect(participants).to.include(retail2.address);
    });
  });
});
