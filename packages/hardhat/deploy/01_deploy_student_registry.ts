import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys StudentRegistry contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployStudentRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("StudentRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const registry = await hre.ethers.getContract<Contract>("StudentRegistry", deployer);
  console.log("👩‍🎓 StudentRegistry deployed to:", await registry.getAddress());

  // Add test students
  console.log("📝 Adding test students...");

  const students = [
    {
      address: "0x1111111111111111111111111111111111111111",
      name: "Ana Silva",
      university: "Universidade de São Paulo (USP)",
      research: "Artificial Intelligence & Machine Learning",
    },
    {
      address: "0x2222222222222222222222222222222222222222",
      name: "Carlos Mendoza",
      university: "Tecnológico de Monterrey (ITESM)",
      research: "Blockchain & Decentralized Systems",
    },
    {
      address: "0x3333333333333333333333333333333333333333",
      name: "María Fernández",
      university: "Universidad Nacional Autónoma de México (UNAM)",
      research: "Climate Science & Sustainability",
    },
    {
      address: "0x4444444444444444444444444444444444444444",
      name: "João Santos",
      university: "Universidade Estadual de Campinas (UNICAMP)",
      research: "Renewable Energy & Smart Grids",
    },
    {
      address: "0x5555555555555555555555555555555555555555",
      name: "Valentina Rojas",
      university: "Universidad de Buenos Aires (UBA)",
      research: "Public Health & Social Impact",
    },
    {
      address: "0x6666666666666666666666666666666666666666",
      name: "Diego Ramírez",
      university: "Pontificia Universidad Católica de Chile",
      research: "Quantum Computing & Cryptography",
    },
    {
      address: "0x7777777777777777777777777777777777777777",
      name: "Isabella Costa",
      university: "Universidade Federal do Rio de Janeiro (UFRJ)",
      research: "Biotechnology & Gene Therapy",
    },
    {
      address: "0x8888888888888888888888888888888888888888",
      name: "Santiago Torres",
      university: "Universidad de los Andes (Colombia)",
      research: "Financial Inclusion & Web3",
    },
  ];

  for (const student of students) {
    const tx = await registry.addStudent(student.address, student.name, student.university, student.research);
    await tx.wait();
    console.log(`  ✅ Added: ${student.name} (${student.university})`);
  }

  console.log(`\n🎓 Total students registered: ${students.length}`);
};

export default deployStudentRegistry;

deployStudentRegistry.tags = ["StudentRegistry"];
deployStudentRegistry.dependencies = ["MockUSDC"];
