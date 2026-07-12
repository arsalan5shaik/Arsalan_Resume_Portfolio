import { ImageResponse } from "next/og";

import { profile } from "@/lib/data/profile";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #1c1130 0%, #0e0a17 65%, #120b1f 100%)",
          color: "#f5f3fb",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#c9a6f7",
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 700,
            marginTop: 28,
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 42,
            marginTop: 28,
            color: "#e879f9",
          }}
        >
          {profile.tagline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 56,
            color: "#a89fc2",
          }}
        >
          {profile.location}
        </div>
      </div>
    ),
    { ...size }
  );
}
