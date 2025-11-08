import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const vaultName = searchParams.get("name") || "Endaoment Vault";
  const whale = searchParams.get("whale") || "Whale";
  const amount = searchParams.get("amount") || "0";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app";
  const imageUrl = `${baseUrl}/api/og/vault-created?name=${encodeURIComponent(vaultName)}&whale=${encodeURIComponent(whale)}&amount=${encodeURIComponent(amount)}`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="Join Vault 🚀" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${baseUrl}/vaults" />
    <meta property="fc:frame:button:2" content="Learn More" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="${baseUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:title" content="${vaultName} Created!" />
    <meta property="og:description" content="${whale} created a new vault with ${amount} USDC. Join to fund students!" />
  </head>
  <body>
    <h1>${vaultName} Created!</h1>
    <p>Join the vault and start funding students through DeFi yield.</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
