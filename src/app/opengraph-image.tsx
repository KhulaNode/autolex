import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const alt = "Autolex Auto Electrical Supplies — Powering Your Journey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#081c38",
        color: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        borderBottom: "18px solid #ffd21c",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "#ffd21c",
          fontSize: 26,
          letterSpacing: 5,
          marginBottom: 45,
        }}
      >
        AUTOLEX AUTO ELECTRICAL SUPPLIES
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 90,
          fontWeight: 700,
          lineHeight: 1.05,
        }}
      >
        <span>Powering</span>
        <span>Your Journey.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 25,
          color: "#c7d4e7",
          marginTop: 45,
        }}
      >
        {business.address.display}
      </div>
    </div>,
    size,
  );
}
