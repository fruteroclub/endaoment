import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const studentName = searchParams.get("name") || "Student";
  const university = searchParams.get("university") || "University";
  const research = searchParams.get("research") || "Research";
  const funding = searchParams.get("funding") || "0";

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://endaoment.app";
  const imageUrl = `${baseUrl}/api/og/student?name=${encodeURIComponent(studentName)}&university=${encodeURIComponent(university)}&research=${encodeURIComponent(research)}&funding=${encodeURIComponent(funding)}`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${imageUrl}" />
    <meta property="fc:frame:button:1" content="Fund ${studentName} 🎓" />
    <meta property="fc:frame:button:1:action" content="link" />
    <meta property="fc:frame:button:1:target" content="${baseUrl}/allocate" />
    <meta property="fc:frame:button:2" content="View All Students" />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="${baseUrl}/student" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:title" content="${studentName} - ${university}" />
    <meta property="og:description" content="${research}. Help fund education through DeFi!" />
  </head>
  <body>
    <h1>${studentName}</h1>
    <p>${university} - ${research}</p>
    <p>Funding received: ${funding} USDC</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
