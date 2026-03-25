import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ancora – Ein digitales Hausbuch für unsichere Zeiten";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf8f5",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Subtle border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid #e8ddd0",
            borderRadius: "16px",
            display: "flex",
          }}
        />

        {/* Anchor symbol */}
        <div
          style={{
            fontSize: "48px",
            color: "#d4c4ad",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          ⚓
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 300,
            color: "#3f3224",
            letterSpacing: "-1px",
            marginBottom: "12px",
            display: "flex",
          }}
        >
          Ancora
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#9a7e62",
            marginBottom: "40px",
            display: "flex",
          }}
        >
          Ein digitales Hausbuch für unsichere Zeiten
        </div>

        {/* Three pillars */}
        <div
          style={{
            display: "flex",
            gap: "48px",
            color: "#b8a086",
            fontSize: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6b7c5e",
                display: "flex",
              }}
            />
            Verstehen
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6b7c5e",
                display: "flex",
              }}
            />
            Handeln
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#6b7c5e",
                display: "flex",
              }}
            />
            Haltung finden
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
