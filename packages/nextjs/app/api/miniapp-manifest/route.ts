import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://endaoment-mvp.vercel.app";

  const manifest = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwNjg1LCJ0eXBlIjoiYXV0aCIsImtleSI6IjB4ODI1Nzk0ZjM3OTJlODE5NTFGRTU1QjdGNTI3ZWFiN2U4MDYzZDJjYyJ9",
      payload: "eyJkb21haW4iOiJlbmRhb21lbnQtbXZwLnZlcmNlbC5hcHAifQ",
      signature: "/qqmOXrc+btoLpSepZ+IRuFs8F8Zsrkc8NOUAy6Ry7IgUScFj0y8U5L9btWD/e2XfeYZOV/C+rJJbu+uUD9Gqxs=",
    },
    baseBuilder: {
      ownerAddress: "0x825794f3792e81951FE55B7F527eab7e8063d2cc",
    },
    miniapp: {
      version: "1",
      name: "Endaoment",
      homeUrl: baseUrl,
      iconUrl: `${baseUrl}/logo/endaoment-logo.png`,
      splashImageUrl: `${baseUrl}/logo/endaoment-logo.png`,
      splashBackgroundColor: "#FFFFFF",
      subtitle: "Fund students via DeFi yield",
      description:
        "Endaoment connects institutional donors with students through an innovative DeFi yield mechanism. Whales deposit stablecoins, and generated yield automatically funds student education.",
      screenshotUrls: [],
      primaryCategory: "finance",
      tags: ["defi", "education", "yield", "social-impact", "dao"],
      heroImageUrl: `${baseUrl}/logo/endaoment-logo.png`,
      tagline: "Fund education with yield",
      ogTitle: "Endaoment - Fund Students Through DeFi Yield",
      ogDescription:
        "Connect institutional donors with students through DeFi yield. Sustainable funding for education powered by blockchain.",
      ogImageUrl: `${baseUrl}/logo/endaoment-logo.png`,
      noindex: false,
    },
  };

  return NextResponse.json(manifest);
}
