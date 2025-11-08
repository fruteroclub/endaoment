import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vaultName = searchParams.get("name") || "Endaoment Vault";
  const whale = searchParams.get("whale") || "Whale Donor";
  const amount = searchParams.get("amount") || "0";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5DADE2",
          backgroundImage: "linear-gradient(135deg, #5DADE2 0%, #3374FF 100%)",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "60px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            width: "90%",
          }}
        >
          <div style={{ fontSize: "72px", fontWeight: "bold", marginBottom: "20px", color: "#5DADE2" }}>
            🏦 New Vault Created!
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "600",
              marginBottom: "20px",
              color: "#111",
              textAlign: "center",
            }}
          >
            {vaultName}
          </div>
          <div style={{ fontSize: "36px", color: "#666", marginBottom: "40px" }}>by {whale}</div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#5DADE2",
              marginBottom: "20px",
            }}
          >
            ${amount} USDC
          </div>
          <div style={{ fontSize: "32px", color: "#888" }}>Fund students through DeFi yield</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
