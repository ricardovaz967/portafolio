import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
          color: "#F8FAFC",
          padding: 64,
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: 24, color: "#94A3B8" }}>Java Backend Developer</p>
        <h1 style={{ fontSize: 56, margin: "16px 0", fontWeight: 700 }}>
          Ricardo Israel Vázquez Domínguez
        </h1>
        <p style={{ fontSize: 28, maxWidth: 1000 }}>
          Java · Spring Boot · REST APIs · SQL · Microservices
        </p>
      </div>
    ),
    {
      ...size,
    },
  );
}
