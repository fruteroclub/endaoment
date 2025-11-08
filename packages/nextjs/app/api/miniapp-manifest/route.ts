import { NextResponse } from "next/server";

export async function GET() {
  const manifest = {
    name: "Endaoment",
    description: "Yield-generating student funding vaults on Base. Fund education through DeFi.",
    icon: `${process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app"}/logo.svg`,
    homeUrl: process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app",
    version: "1.0.0",
    capabilities: {
      wallet: true,
      identity: true,
      frames: true,
    },
    splashImage: `${process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app"}/thumbnail.jpg`,
    splashBackgroundColor: "#0052FF",
  };

  return NextResponse.json(manifest);
}
