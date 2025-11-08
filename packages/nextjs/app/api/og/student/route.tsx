import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentName = searchParams.get("name") || "Student";
  const university = searchParams.get("university") || "University";
  const research = searchParams.get("research") || "Research Area";
  const funding = searchParams.get("funding") || "0";

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
          backgroundColor: "#10B981",
          backgroundImage: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
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
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎓</div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#111",
              textAlign: "center",
            }}
          >
            {studentName}
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#10B981",
              fontWeight: "600",
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            {university}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#666",
              marginBottom: "40px",
              textAlign: "center",
              maxWidth: "800px",
            }}
          >
            {research}
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#10B981",
              marginBottom: "12px",
            }}
          >
            ${funding} USDC
          </div>
          <div style={{ fontSize: "28px", color: "#888" }}>Funding Received</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
